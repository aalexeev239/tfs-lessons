import {Component, OnInit} from '@angular/core';
import {WalletFireService} from '../wallet-list/wallet-fire.service';
import {Wallet} from '../model/wallet';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth.service';

@Component({
  selector: 'tfs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  wallets: Observable<Wallet[]>;
  isLoggedIn: Observable<boolean>;

  constructor(private walletFireService: WalletFireService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.wallets = this.walletFireService.getWallets();
    this.isLoggedIn = this.authService.isLoggedIn$();
  }

}
