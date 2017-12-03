import {Component, OnInit} from '@angular/core';
import {WalletFireService} from '../wallet-list/wallet-fire.service';
import {Wallet} from '../model/wallet';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'tfs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  wallets: Observable<Wallet[]>;

  constructor(private walletFireService: WalletFireService) {
  }

  ngOnInit() {
    this.wallets = this.walletFireService.getWallets();
  }

}
