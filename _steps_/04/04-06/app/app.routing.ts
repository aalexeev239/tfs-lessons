import {WalletListComponent} from './wallet-list/wallet-list.component';
import {Routes} from '@angular/router';
import {IntroComponent} from './intro/intro.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {WalletComponent} from './wallet/wallet.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';

export const appRoutes: Routes = [
  {
    path: 'wallets',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: WalletComponent
      },
      {
        path: '',
        component: WalletListComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: IntroComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
