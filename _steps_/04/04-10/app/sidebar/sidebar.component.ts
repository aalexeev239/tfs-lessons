import {Component, OnInit} from '@angular/core';
import {WalletFireService} from '../wallet-list/wallet-fire.service';
import {Wallet} from '../model/wallet';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth.service';
import {User} from '../model/user';

@Component({
  selector: 'tfs-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  wallets: Observable<Wallet[]>;
  user$: Observable<User>;

  constructor(private walletFireService: WalletFireService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.wallets = this.walletFireService.getWallets();
    this.user$ = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
