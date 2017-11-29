import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletComponent} from './wallet.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WalletComponent],
  exports: [WalletComponent]
})
export class WalletModule {
}
