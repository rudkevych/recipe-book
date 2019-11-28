import * as AuthActions from './store/auth.actions';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { User } from './user.model';
import { error } from 'util';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>
      (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>
      (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email,
          password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
      // this.user.next(loadedUser);
      this.store.dispatch(
        new AuthActions.Login({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate)
        }));
    }

  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  logOut() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    // this.user.next(user);
    this.store.dispatch(new AuthActions.Login({email, userId, token, expirationDate}));
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already used!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Cant`t find such email. Try to register!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is not correct. Please, try again';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User is disabled. write us admin@gmail.com';
        break;
    }
    return throwError(errorMessage);
  }

}
