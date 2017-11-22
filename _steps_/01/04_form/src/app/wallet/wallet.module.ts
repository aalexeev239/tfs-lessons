import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletComponent} from './wallet.component';
import {PurchasePreviewComponent} from './purchase-preview/purchase-preview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WalletComponent, PurchasePreviewComponent],
  exports: [WalletComponent]
})
export class WalletModule {
}
