import {Injectable} from '@angular/core';
import {Wallet} from '../model/wallet';

@Injectable()
export class WalletListService {

  constructor() {
  }

  getWallets(): Wallet[] {
    return [
      {
        name: 'Мой первый кошелек',
        amount: 100000
      },
      {
        name: 'Второй кошелек',
        amount: 50000
      }
    ];
  }

}
