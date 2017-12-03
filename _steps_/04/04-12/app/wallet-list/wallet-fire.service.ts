import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Wallet} from '../model/wallet';
import 'rxjs/add/operator/map';

@Injectable()
export class WalletFireService {

  constructor(private db: AngularFireDatabase) {
  }

  getWallets(): Observable<Wallet[]> {
    return this.db.list<Wallet>('wallets')
      .snapshotChanges()
      .map((walletSnapshots) => walletSnapshots.map(({key, payload}) => ({...payload.val(), id: key})));
  }

  getWallet(id: string): Observable<Wallet> {
    return this.db.object<Wallet>(`wallets/${id}`)
      .valueChanges()
      .map((wallet) => wallet ? {...wallet, id} : wallet);
  }
}
