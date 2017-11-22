import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {WalletService} from './wallet.service';
import {Wallet} from '../model/wallet';
import {WalletHttpService} from './wallet-http.service';

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
              private walletHttpService: WalletHttpService) {
  }

  get balance(): number {
    return this.wallet.amount - this.total;
  }

  ngOnInit() {
    // this.setPurchases();
    this.walletHttpService.getPurchases()
      .subscribe((purchases) => {
        this.setPurchasesAsync(purchases);
      });
  }

  loadPurchases() {
    this.walletHttpService.getPurchases()
      .subscribe((purchases) => {
        this.setPurchasesAsync(purchases);
      });
  }

  setPurchasesAsync(purchases: Purchase[]) {
    this.purchases = purchases.reverse();
    this.total = this.walletService.getTotal(this.purchases);
  }

  setPurchases() {
    const {purchases, total} = this.walletService.getPurchases();

    this.purchases = purchases;
    this.total = total;
  }

  onAddPurchase(newPurchase: Purchase) {
    // this.walletService.addPurchase(newPurchase);
    // this.setPurchases();
    // this.toggleAdd();
    this.walletHttpService.addPurchase(newPurchase)
      .subscribe((id) => {
        // this.loadPurchases();
        const resultPurchase = Object.assign({}, newPurchase, {id});

        this.setPurchasesAsync([...this.purchases, resultPurchase]);
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

  // onPreviewDelete(index: number) {
  //   this.walletService.deletePurchase(index);
  //   this.setPurchases();
  // }

  onPreviewDelete({id}: Purchase) {
    this.walletHttpService.deletePurchase(id)
      .subscribe(() => {
        this.loadPurchases();
      });
  }

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }
}
