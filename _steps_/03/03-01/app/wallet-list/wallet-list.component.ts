import {Component, OnInit} from '@angular/core';
import {WalletListService} from './wallet-list.service';
import {Wallet} from '../model/wallet';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'tfs-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  wallets: Wallet[];
  asyncWallets: Observable<Wallet[]>;

  constructor(private walletListService: WalletListService,
              private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.db.list<Wallet>('wallets').snapshotChanges()
      .subscribe((snapshots) => {
        console.log('--- snapshots', snapshots);
        console.log('--- snapshots[0]', snapshots[0]);
        this.wallets = snapshots.map(
          ({key, payload}) => {
            return Object.assign({id: key}, payload.val());
          }
          // ({key, payload}) => ({id: key, ...payload.val()}))
        );
      });

    this.asyncWallets = this.db.list<Wallet>('wallets').snapshotChanges()
      .map((snapshots) => snapshots.map(({key, payload}) => ({id: key, ...payload.val()})));
  }
}
