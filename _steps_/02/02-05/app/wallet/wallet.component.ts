import {Component, Input, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {WalletService} from './wallet.service';
import {Wallet} from '../model/wallet';

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

  constructor(private walletService: WalletService) {
  }

  get balance(): number {
    return this.wallet.amount - this.total;
  }

  ngOnInit() {
    this.setPurchases();
  }

  setPurchases() {
    const {purchases, total} = this.walletService.getPurchases()

    this.purchases = purchases;
    this.total = total;
  }

  onAddPurchase(newPurchase: Purchase) {
    this.walletService.addPurchase(newPurchase);
    this.setPurchases();
    this.toggleAdd();
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

  onPreviewDelete(index: number) {
    this.walletService.deletePurchase(index);
    this.setPurchases();
  }

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }
}
