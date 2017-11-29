import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {WalletService} from './wallet.service';
import {Wallet} from '../model/wallet';
import {WalletHttpService} from './wallet-http.service';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import {PurchasesService} from './purchases.service';

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
              private purchasesService: PurchasesService) {
  }

  get balance(): number {
    return this.wallet.amount - this.total;
  }

  ngOnInit() {
    this.purchasesService.getPurchasesForWallet(this.wallet.id)
      .subscribe((purchases) => {
        this.setPurchasesAsync(purchases);
      });
  }

  onAddPurchase(newPurchase: Purchase) {
    this.purchasesService.addPurchase(newPurchase, this.wallet.id)
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
    this.purchasesService.deletePurchase(id, this.wallet.id)
      .subscribe();
  }

  onPurchaseEdit(purchase: Purchase) {
    this.purchasesService.editPurchase(purchase);
  }

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }

  private setPurchasesAsync(purchases: Purchase[]) {
    this.purchases = purchases.slice(0).reverse();
    this.total = this.walletService.getTotal(this.purchases);
  }
}
