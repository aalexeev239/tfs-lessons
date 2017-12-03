import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {WalletService} from './wallet.service';
import {Wallet} from '../model/wallet';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import {PurchasesService} from './purchases.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WalletFireService} from '../wallet-list/wallet-fire.service';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private walletService: WalletService,
              private walletFire: WalletFireService,
              private purchasesService: PurchasesService) {
  }

  get balance(): number {
    return this.wallet.amount - this.total;
  }

  ngOnInit() {
    if (this.wallet) {
      this.setPurchases();
      return;
    }

    this.route.paramMap
      .switchMap((param) => this.walletFire.getWallet(param.get('id')))
      .subscribe((wallet) => {
        if (!wallet) {
          this.router.navigate(['/wallets']);
          return;
        }

        this.wallet = wallet;
        this.setPurchases();
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

  private setPurchases() {
    this.purchasesService.getPurchasesForWallet(this.wallet.id)
      .subscribe((purchases) => {
        this.setPurchasesAsync(purchases);
      });
  }

  private setPurchasesAsync(purchases: Purchase[]) {
    this.purchases = purchases.slice(0).reverse();
    this.total = this.walletService.getTotal(this.purchases);
  }
}
