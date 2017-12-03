import {WalletListComponent} from './wallet-list/wallet-list.component';
import {Routes} from '@angular/router';
import {IntroComponent} from './intro/intro.component';

export const appRoutes: Routes = [
  {
    path: 'wallets',
    component: WalletListComponent
  },
  {
    path: 'intro',
    component: IntroComponent
  }
];
