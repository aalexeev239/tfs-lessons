import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Purchase} from '../../model/purchase';
import {currencyCode} from '../../constants/currency.const';

@Component({
  selector: 'tfs-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css']
})
export class PurchasePreviewComponent implements OnInit {
  @Input() purchase: Purchase;

  currencyCode = currencyCode;

  constructor() {
  }

  ngOnInit() {
  }
}
