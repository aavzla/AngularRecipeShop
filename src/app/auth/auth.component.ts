import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoginMode = true;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    //console.log(this.constructor.name + ' - The form values.', form.value);

    //This is a validation in case the html is malicious manipulated.
    //In general, it should not be triggered, because we disabled the button in case it is invalid.
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      //Login mode.

    } else {
      //Sign up mode.
      this.authService.signup(email, password)
        .subscribe(responseData => {
          console.log(this.constructor.name + ' - Signup response.', responseData);
        }, error => {
          console.log(this.constructor.name + ' - Signup Error.', error);
        });

    }

    form.reset();
  }
}
