import { error } from 'util';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfIiXzxI72D5lNlbGGpZszVu_ak0ZhKNk',
        {
          email,
          password,
          returnSecureToken: true
        }
      ).pipe(catchError(this.handleError));
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfIiXzxI72D5lNlbGGpZszVu_ak0ZhKNk',
        {
          email,
          password,
          returnSecureToken: true
        }).pipe(catchError(this.handleError));
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
