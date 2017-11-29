import {Component, OnInit} from '@angular/core';
import {Purchase} from '../model/purchase';

@Component({
  selector: 'tfs-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  purchases: Purchase[] = [];

  constructor() {
  }

  ngOnInit() {
    this.purchases = this.getData();
  }

  private getData(): Purchase[] {
    return [
      {
        title: 'Проезд на метро',
        price: 1700
      },
      {
        title: 'IPhone X 256gb',
        price: 91990
      },
      {
        title: 'Лапша "Доширак"',
        price: 40
      }
    ];
  }
}
