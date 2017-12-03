import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Wallet} from '../model/wallet';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth.service';
import {AngularFireList, AngularFireObject} from 'angularfire2/database/interfaces';
import {Subject} from 'rxjs/Subject';

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

  getWallet(walletId: string): Observable<Wallet> {
    return this.getWalletObject(walletId)
      .switchMap((walletObject) => walletObject.valueChanges())
      .map((wallet) => wallet ? {...wallet, id: walletId} : wallet);
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

  updateWallet(wallet: Wallet): Observable<void> {
    return this.getWalletObject(wallet.id)
      .switchMap(object => object.update(wallet));
  }

  private getWalletList(id: string): AngularFireList<Wallet> {
    return this.db.list(`users/${id}/wallets`);
  }

  private getWalletObject(walletId: string): Observable<AngularFireObject<Wallet>> {
    return this.getUserId()
      .filter(uid => !!uid)
      .map((uid) => this.db.object(`users/${uid}/wallets/${walletId}`));
  }

  private getUserId(): Observable<string> {
    return this.authService
      .getUser()
      .map((user) => user ? user.uid : null);
  }
}
