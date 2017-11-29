import {NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {WalletComponent} from './wallet.component';
import {PurchasePreviewComponent} from './purchase-preview/purchase-preview.component';
import {AddPurchaseModule} from './add-purchase/add-purchase.module';
import {WalletService} from './wallet.service';

@NgModule({
  imports: [
    CommonModule,
    AddPurchaseModule
  ],
  declarations: [WalletComponent, PurchasePreviewComponent],
  exports: [WalletComponent],
  providers: [WalletService]
})
export class WalletModule {
}
