import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Purchase} from '../model/purchase';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class PurchasesService {

  constructor(private db: AngularFireDatabase) {
  }

  getPurchasesForWallet(walletId: string): Observable<Purchase[]> {
    return this.db.list(`purchasesPerWallets/${walletId}`)
      .snapshotChanges()
      .map(snapshot => snapshot.map(({key}) => key))
      .switchMap(walletKeys => {
        if (walletKeys.length === 0) {
          return Observable.of([]);
        }

        const observables = walletKeys.map(
          walletKey => this.db.object(`purchases/${walletKey}`)
            .snapshotChanges()
            .map(({key, payload}) => ({...payload.val(), id: key}))
        );

        return Observable.combineLatest<Purchase>(observables);
      });
  }

  addPurchase(purchase: Purchase, walletId: string): Observable<void> {
    const promise = this.db.list('purchases').push(purchase);

    return Observable.of(promise)
      .switchMap(({key}) => {
        return this.db.object(`purchasesPerWallets/${walletId}`)
          .update({[key]: true});
      });
  }

  editPurchase(purchase: Purchase) {
    const id = purchase.id;

    delete purchase.id;
    this.db.object(`purchases/${id}`).update(purchase);
  }

  deletePurchase(purchaseId: string, walletId: string): Observable<void> {
    return Observable.of(this.db.object(`purchasesPerWallets/${walletId}/${purchaseId}`).remove())
      .switchMap(() => this.db.object(`purchases/${purchaseId}`).remove());
  }
}
