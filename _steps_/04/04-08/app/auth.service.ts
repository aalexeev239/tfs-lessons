import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.getValue();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  login() {
    this.loggedInSubject.next(true);
  }

  logout() {
    this.loggedInSubject.next(false);

    if (this.router.url.startsWith('/wallets')) {
      this.router.navigate(['/login']);
    }
  }
}
