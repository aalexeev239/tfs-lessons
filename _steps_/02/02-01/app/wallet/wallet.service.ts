import {Injectable} from '@angular/core';
import {Purchase} from '../model/purchase';

@Injectable()
export class WalletService {
  private purchases: Purchase[] = [];

  constructor() {
  }

  addPurchase(newPurchase: Purchase) {
    this.purchases.unshift(newPurchase);
  }

  getPurchases(): Purchase[] {
    if (this.purchases.length === 0) {
      this.purchases = this.getData();
    }

    return this.purchases;
  }

  private getData(): Purchase[] {
    return [
      {
        title: 'Проезд на метро',
        price: 1700,
        date: new Date(2017, 10, 3)
      },
      {
        title: 'IPhone X 256gb',
        price: 91990,
        date: new Date(2017, 10, 3)
      },
      {
        title: 'Лапша "Доширак"',
        price: 40,
        date: new Date(2017, 10, 3)
      }
    ];
  }
}
