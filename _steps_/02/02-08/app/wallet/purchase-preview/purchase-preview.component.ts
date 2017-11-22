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
  @Input() isOpen: boolean;
  @Output() previewClick = new EventEmitter();
  @Output() previewDelete = new EventEmitter();

  currencyCode = currencyCode;

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.previewClick.emit();
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation();

    this.previewDelete.emit();
  }
}
