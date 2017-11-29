import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {WalletService} from './wallet.service';
import {Wallet} from '../model/wallet';
import {WalletHttpService} from './wallet-http.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'tfs-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  providers: [WalletService]
})
export class WalletComponent implements OnInit {
  @Input() wallet: Wallet;

  purchases: Purchase[] = [];
  total = 0;
  isAddPurchaseOpen = false;

  private currentOpen: number;

  constructor(private walletService: WalletService,
              private walletHttpService: WalletHttpService,
              private db: AngularFireDatabase) {
  }

  get balance(): number {
    return this.wallet.amount - this.total;
  }

  ngOnInit() {
    this.db.list(`purchasesPerWallets/${this.wallet.id}`).snapshotChanges()
      .map(snapshot => snapshot.map(({key}) => key))
      .switchMap(walletKeys => {
        console.log('--- walletKeys', walletKeys);

        if (walletKeys.length === 0) {
          return Observable.of([]);
        }

        const observables = walletKeys.map(
          walletKey => this.db.object(`purchases/${walletKey}`)
            .snapshotChanges()
            .map(({key, payload}) => ({...payload.val(), id: key}))
        );

        return Observable.combineLatest<Purchase>(observables);
      })
      .subscribe((purchases) => {
        console.log('--- purchases', purchases);
        this.setPurchasesAsync(purchases);
      });
  }

  onAddPurchase(newPurchase: Purchase) {
    Observable.of(this.db.list('purchases').push(newPurchase))
      .switchMap(({key}) => {
        return this.db.object(`purchasesPerWallets/${this.wallet.id}`)
          .update({[key]: true});
      })
      .subscribe((val) => {
        this.toggleAdd();
      });
  }

  toggleAdd() {
    this.isAddPurchaseOpen = !this.isAddPurchaseOpen;
  }

  onPreviewClick(index: number) {
    if (index === this.currentOpen) {
      this.currentOpen = null;
      return;
    }

    this.currentOpen = index;
  }

  onPreviewDelete({id}: Purchase) {
    // Promise way
    // this.db.object(`purchasesPerWallets/${this.wallet.id}/${id}`).remove();
    // this.db.object(`purchases/${id}`).remove();

    // Rx way
    Observable.of(this.db.object(`purchasesPerWallets/${this.wallet.id}/${id}`).remove())
      .switchMap(() => this.db.object(`purchases/${id}`).remove())
      .subscribe();
  }

  onPurchaseEdit(purchase: Purchase) {
    const id = purchase.id;

    delete purchase.id;
    this.db.object(`purchases/${id}`).update(purchase);
  }

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }

  private loadPurchases() {
    this.walletHttpService.getPurchases(this.wallet.id)
      .subscribe((purchases) => {
        this.setPurchasesAsync(purchases);
      });
  }

  private setPurchasesAsync(purchases: Purchase[]) {
    this.purchases = purchases.slice(0).reverse();
    this.total = this.walletService.getTotal(this.purchases);
  }
}
