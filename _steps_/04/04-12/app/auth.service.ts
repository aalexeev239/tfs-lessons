import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from './model/user';
import {Login} from './model/login';

@Injectable()
export class AuthService {
  private user$ = new BehaviorSubject<User>(null);
  redirectUrl: string;

  constructor(private router: Router,
              private firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState
      .subscribe((authState) => {
        console.log('--- authState', authState);
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

  login({email, password}: Login): Observable<any> {
    return Observable.fromPromise(
      this.firebaseAuth
        .auth
        .signInWithEmailAndPassword(email, password)
    ).do(() => {
      if (this.redirectUrl) {
        const url = this.redirectUrl;

        this.router.navigate([url]);
      }
    });
  }

  signUp({email, password}: Login): Observable<any> {
    return Observable.fromPromise(
      this.firebaseAuth
        .auth
        .createUserWithEmailAndPassword(email, password)
    ).do(() => {
      const url = this.redirectUrl || '/';

      this.router.navigate([url]);
    });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut()
      .then(() => {
        if (this.router.url.startsWith('/wallets')) {
          this.router.navigate(['/']);
        }
      });
  }
}
