import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean;
  isLoading: boolean;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoginMode = true;
    this.isLoading = false;
    this.error = null;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
  }

  onSubmit(form: NgForm) {
    //console.log(this.constructor.name + ' - The form values.', form.value);

    //This is a validation in case the html is malicious manipulated.
    //In general, it should not be triggered, because we disabled the button in case it is invalid.
    if (!form.valid) {
      return;
    }

    //This will check if we had an error before and try to submit again, it will remove it.
    if (this.error) {
      this.error = null;
    }

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      //Login mode.
      //console.log(this.constructor.name + ' - Login mode.');
      authObservable = this.authService.login(email, password);
    } else {
      //Sign up mode.
      //console.log(this.constructor.name + ' - Sign up mode.');
      authObservable = this.authService.signup(email, password);
    }

    authObservable.subscribe(responseData => {
      //console.log(this.constructor.name + ' - Response.', responseData);
      this.isLoading = false;
      this.router.navigate(['/recipe-book']);
    }, errorMessage => {
      //console.log(this.constructor.name + ' - Error message.', errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
