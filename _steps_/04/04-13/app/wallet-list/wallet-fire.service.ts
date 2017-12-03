import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Wallet} from '../model/wallet';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth.service';
import {AngularFireList} from 'angularfire2/database/interfaces';

@Injectable()
export class WalletFireService {

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
  }

  getWallets(): Observable<Wallet[]> {
    return this.getUserId()
      .switchMap((id) => {

        if (!id) {
          return Observable.of([]);
        }

        return this.getWalletList(id)
          .snapshotChanges()
          .map((walletSnapshots) => walletSnapshots.map(({key, payload}) => ({...payload.val(), id: key})));
      });
  }

  getWallet(id: string): Observable<Wallet> {
    return this.db.object<Wallet>(`wallets/${id}`)
      .valueChanges()
      .map((wallet) => wallet ? {...wallet, id} : wallet);
  }

  addWallet(): Observable<void> {
    return this.getUserId()
      .filter(id => !!id)
      .map(id => this.getWalletList(id))
      .switchMap(list => list.push({
        id: '',
        name: 'Новый кошелек',
        amount: 10000
      }));
  }

  private getWalletList(id: string): AngularFireList<Wallet> {
    return this.db.list(`users/${id}/wallets`);
  }

  private getUserId(): Observable<string> {
    return this.authService
      .getUser()
      .map((user) => user ? user.uid : null);
  }
}
