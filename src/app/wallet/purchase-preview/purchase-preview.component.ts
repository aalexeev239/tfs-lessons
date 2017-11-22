import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Purchase} from '../../model/purchase';

@Component({
  selector: 'tfs-purchase-preview',
  templateUrl: './purchase-preview.component.html',
  styleUrls: ['./purchase-preview.component.css']
})
export class PurchasePreviewComponent implements OnInit, OnChanges {
  @Input() purchase: Purchase;
  @Input() isOpen: boolean;
  @Output() previewClick = new EventEmitter();
  @Output() previewDelete = new EventEmitter();
  @Output() edit = new EventEmitter<Purchase>();
  isEdit;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    
  }

  onClick() {
    this.previewClick.emit();
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation();

    this.previewDelete.emit();
  }

  onEditPurchase() {
  }

  toggleEdit() {
  }
}
