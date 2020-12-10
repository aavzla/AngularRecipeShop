import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Observable,
  Subscription
} from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean;
  isLoading: boolean;
  //This component property is used for the error message box and for the ngIf dynamic component approach only.
  //By using the programmatic dynamic component approach, we no longer need it.
  error: string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  //This is an alternative approach without the use of the directive
  //@ViewChild('alert') alertViewContainerRef: ViewContainerRef;
  private closeSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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
      //This component property is used for the error message box and for the ngIf dynamic component approach only.
      //By using the programmatic dynamic component approach, we no longer need it.
      this.error = errorMessage;
      //Here we use a private method to create, manage and destroy a programmatic dynamic component.
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    //This is an alternative approach without the use of the directive
    //this.alertViewContainerRef.clear;
    //this.alertViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
