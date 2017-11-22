import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Purchase} from '../model/purchase';

const BASE_URL = 'https://qwerty.firebaseio.com';

@Injectable()
export class WalletHttpService {

  constructor(private http: HttpClient) {
  }

  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${BASE_URL}/purchases.json`)
      .map<Purchase[], Purchase[]>(result => {
        return Object.entries(result).map(
          ([key, value]) => Object.assign({}, value, {key})
        );
      });
  }

  addPurchase(newPurchase: Purchase): Observable<string> {
    return this.http.post(`${BASE_URL}/purchases.json`, newPurchase)
      .map<any, string>(({name}) => name);
  }
}
