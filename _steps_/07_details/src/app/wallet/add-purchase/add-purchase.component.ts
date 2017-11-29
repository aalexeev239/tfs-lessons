import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Purchase} from '../../model/purchase';

@Component({
  selector: 'tfs-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {
  form: FormGroup;
  @Output() addPurchase = new EventEmitter<Purchase>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: [''],
    });
  }

  onSubmit() {
    const price = parseFloat(this.form.value.price);

    if (isNaN(price)) {
      return;
    }

    const purchase: Purchase = {
      title: this.form.value.title,
      price: price
    };

    this.addPurchase.emit(purchase);
  }
}
