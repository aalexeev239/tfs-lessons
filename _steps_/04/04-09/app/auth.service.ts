import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from './model/user';

@Injectable()
export class AuthService {
  private user$ = new BehaviorSubject<User>(null);

  constructor(private router: Router,
              private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState
      .subscribe((authState) => {
        if (!authState) {
          this.user$.next(null);
          return;
        }

        this.user$.next({
          email: authState.email,
          uid: authState.uid
        });
      });
  }

  getUser(): Observable<User> {
    return this.user$.asObservable();
  }

  login() {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword('alexeev.andrey.a@gmail.com', '123456')
      .then((result) => {
        console.log('--- result', result);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();

    // this.loggedInSubject.next(false);
    //
    // if (this.router.url.startsWith('/wallets')) {
    //   this.router.navigate(['/login']);
    // }
  }
}
