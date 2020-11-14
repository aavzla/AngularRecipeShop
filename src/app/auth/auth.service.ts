import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey: string;
  userSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.apiKey = 'AIzaSyCzUr7xoNsMC-xDKS5e0iKvp11pm8bBU6s';
    this.userSubject = new BehaviorSubject<User>(null);
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.HandleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      })
    );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(this.constructor.name + ' - Error received.', errorResponse);
    let errorMessage = "An unknown error occurred!";
    if (errorResponse.error && errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        //Signup cases
        case 'EMAIL_EXISTS':
          //The email address is already in use by another account.
          errorMessage = 'This email exist already.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          //Password sign-in is disabled for this project.
          errorMessage = 'The Sign-in is disabled.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          //We have blocked all requests from this device due to unusual activity.Try again later.
          errorMessage = 'Please stop. Try again later.';
          break;
        //Login cases
        case 'EMAIL_NOT_FOUND':
          //There is no user record corresponding to this identifier. The user may have been deleted.
          errorMessage = 'This email does not exist.';
          break;
        case 'INVALID_PASSWORD':
          //The password is invalid or the user does not have a password.
          errorMessage = 'This password is not correct.';
          break;
        case 'USER_DISABLED':
          //The user account has been disabled by an administrator.
          errorMessage = 'Please contact the admin.';
          break;
      }
    }
    return throwError(errorMessage);
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(responseData => {
        this.HandleAuthentication(
          responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn
        );
      }));
  }

  private HandleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + (+expiresIn * 1000)
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.userSubject.next(user);
  }
}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
