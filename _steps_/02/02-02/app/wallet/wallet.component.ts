import {Component, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';
import {WalletService} from './wallet.service';

@Component({
  selector: 'tfs-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  purchases: Purchase[] = [];
  total = 0;
  isAddPurchaseOpen = false;

  private currentOpen: number;

  constructor(private walletService: WalletService) {
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

  isCurrentOpen(index: number): boolean {
    return this.currentOpen === index;
  }
}
