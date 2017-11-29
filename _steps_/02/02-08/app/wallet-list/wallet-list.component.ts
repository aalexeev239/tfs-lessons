import { Component, OnInit } from '@angular/core';
import {WalletListService} from './wallet-list.service';
import {Wallet} from '../model/wallet';

@Component({
  selector: 'tfs-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  wallets: Wallet[];

  constructor(private walletListService: WalletListService) { }

  ngOnInit() {
    this.wallets = this.walletListService.getWallets();
  }
}
