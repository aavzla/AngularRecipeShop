import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzUr7xoNsMC-xDKS5e0iKvp11pm8bBU6s',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorResponse => {
      console.log(this.constructor.name + ' - Signup Error.', errorResponse);
      let errorMessage = "An unknown error occurred!";
      if (errorResponse.error && errorResponse.error.error) {
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exist already.';
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'The Sign-in is disabled.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'Please stop. Try again later.';
            break;
        }
      }
      return throwError(errorMessage);
    }));
  }
}

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
