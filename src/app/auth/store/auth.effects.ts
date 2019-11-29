import { error } from 'util';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router) { }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      console.log(authData);
      // return this.authService.logIn(authData.payload.email, authData.payload.password
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(map(resData => {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        return new AuthActions.Login({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate});
      }),
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.LoginFail(errorMessage));
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

          return of(new AuthActions.LoginFail(errorMessage));
        })
        );
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })

  );

}



