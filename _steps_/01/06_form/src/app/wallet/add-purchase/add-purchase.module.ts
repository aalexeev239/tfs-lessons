import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddPurchaseComponent} from './add-purchase.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddPurchaseComponent],
  exports: [AddPurchaseComponent]
})
export class AddPurchaseModule {
}
