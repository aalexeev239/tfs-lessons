import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Purchase} from '../model/purchase';
import {BASE_URL} from '../constants/baseUrl.const';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class WalletHttpService {

  constructor(private http: HttpClient) {
  }

  getWalletPurchaseKeys(walletId: string): Observable<string[]> {
    return this.http.get(`${BASE_URL}/purchasesPerWallets/${walletId}.json`)
      .map(data => data ? Object.keys(data) : []);
  }

  getPurchases(walletId: string): Observable<Purchase[]> {
    return this.getWalletPurchaseKeys(walletId)
      .switchMap(keys => Observable.forkJoin(keys.map(key => {
        return this.getPurchase(key);
      })))
      .map((purchases) => purchases.filter(purchase => !!purchase));
  }

  getPurchase(id: string): Observable<Purchase> {
    return this.http.get<Purchase>(`${BASE_URL}/purchases/${id}.json`)
      .map(purchase => purchase ? Object.assign(purchase, {id}) : purchase);
  }

  addPurchase(walletId: string, newPurchase: Purchase): Observable<string> {
    return this.http.post(`${BASE_URL}/purchases.json`, newPurchase)
      .map<any, string>(({name}) => name)
      .switchMap(name => {
        return this.http.patch(`${BASE_URL}/purchasesPerWallets/${walletId}.json`, {[name]: true});
      })
      .map((result) => Object.keys(result)[0]);
  }

  deletePurchase(walletId: string, id: string): Observable<any> {
    return Observable.forkJoin(
      this.http.delete(`${BASE_URL}/purchases/${id}.json`),
      this.http.delete(`${BASE_URL}/purchasesPerWallets/${walletId}/${id}.json`)
    );
  }

  updatePurchase(purchase: Purchase) {
  }
}
