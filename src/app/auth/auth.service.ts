import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiKey: string;
  userSubject: BehaviorSubject<User>;
  userData: string;
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.apiKey = 'AIzaSyCzUr7xoNsMC-xDKS5e0iKvp11pm8bBU6s';
    this.userSubject = new BehaviorSubject<User>(null);
    this.userData = "uD";
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
    //console.log(this.constructor.name + ' - Error received.', errorResponse);
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

  autoLogin() {
    //This approach is easy to implement to keep the auth state persistence.
    //But for a better implementation, take a look at the Firebase docs: https://firebase.google.com/docs/auth/web/auth-state-persistence.
    const userString = localStorage.getItem(this.userData);
    //console.log(this.constructor.name + ' - This is the userString found in LocalStorage.', userString);
    if (!userString) {
      return;
    }
    //When we convert the string object with JSON, we could use a JS object, Interface, or Class.
    //If we use the Class, we will only have access to the public properties and not any getter or method.
    //If we had: let userObj: User = JSON.parse(userString); -- The user.token getter does not work.
    let userObj: { email: string, id: string, _token: string, _tokenExpirationDate: Date } = JSON.parse(userString);
    //console.log(this.constructor.name + ' - This is the JSON object of the user found in LocalStorage.', userObj);

    //In order for the getter works, we need to construct the object through the constructor and not by casting.
    const user = new User(userObj.email, userObj.id, userObj._token, new Date(userObj._tokenExpirationDate));
    //console.log(this.constructor.name + ' - Can i get the user token?', user.token);
    if (user.token) {
      this.userSubject.next(user);
      //Set up the autoLogout timer. Difference between dates. we want milliseconds.
      const expirationDurationMilliseconds = new Date(userObj._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDurationMilliseconds);
    }
  }

  logout() {
    //Remove the user by passing null
    this.userSubject.next(null);
    //Redirect to the Authenticate page
    this.router.navigate(['/auth']);
    //Clear token of the user
    localStorage.removeItem(this.userData);
    //Do we have a tokenExpirationTimer active?
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout(expirationDurationMilliseconds: number) {
    //console.log(this.constructor.name + ' - Expiration duration in milliseconds: ' + expirationDurationMilliseconds);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDurationMilliseconds);
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
    //Set up the autoLogout timer. expiresIn is in seconds. we want milliseconds.
    this.autoLogout(expiresIn * 1000);
    //Save the user data in the local storage for auth state persistence.
    localStorage.setItem(this.userData, JSON.stringify(user));
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
