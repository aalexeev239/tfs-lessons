import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WalletListComponent} from './wallet-list.component';
import {WalletModule} from '../wallet/wallet.module';
import {WalletListService} from './wallet-list.service';

@NgModule({
  imports: [
    CommonModule,
    WalletModule
  ],
  declarations: [WalletListComponent],
  exports: [WalletListComponent],
  providers: [WalletListService]
})
export class WalletListModule {
}
