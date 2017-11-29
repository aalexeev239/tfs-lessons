import {Injectable} from '@angular/core';
import {Wallet} from '../model/wallet';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../constants/baseUrl.const';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WalletListService {

  constructor(private http: HttpClient) {
  }

  getWallets(): Observable<Wallet[]> {
    return this.http.get(`${BASE_URL}/wallets.json`)
      .map((data) => {
        return Object.entries(data)
          .map(([id, value]) => Object.assign(value, {id}));
      });
  }

}
