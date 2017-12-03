import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import {AppComponent} from './app.component';
import {WalletModule} from './wallet/wallet.module';
import {WalletListModule} from './wallet-list/wallet-list.module';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routing';
import { SidebarComponent } from './sidebar/sidebar.component';
import { IntroComponent } from './intro/intro.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WalletModule,
    WalletListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
