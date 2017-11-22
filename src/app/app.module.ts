import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {AppComponent} from './app.component';
import {WalletModule} from './wallet/wallet.module';
import {WalletListModule} from './wallet-list/wallet-list.module';
import {HttpClientModule} from '@angular/common/http';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WalletModule,
    WalletListModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
