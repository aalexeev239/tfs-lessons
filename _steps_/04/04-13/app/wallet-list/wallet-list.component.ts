import {Component, OnInit} from '@angular/core';
import {WalletListService} from './wallet-list.service';
import {Wallet} from '../model/wallet';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {WalletFireService} from './wallet-fire.service';

@Component({
  selector: 'tfs-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  asyncWallets: Observable<Wallet[]>;

  constructor(private walletFireService: WalletFireService) {
  }

  ngOnInit() {
    this.asyncWallets = this.walletFireService.getWallets();
  }

  addWallet() {
    this.walletFireService.addWallet()
      .subscribe();
  }
}
