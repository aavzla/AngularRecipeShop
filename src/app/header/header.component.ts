import {
  Component,
  OnInit,
  OnDestroy,
  //Output,
  //EventEmitter
} from "@angular/core";
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean;
  isAuthenticated: boolean;
  //@Output() featureSelected: EventEmitter<string>;
  private userSub: Subscription


  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
    this.collapsed = true;
    this.isAuthenticated = false;
    //this.featureSelected = new EventEmitter<string>();
  }

  ngOnInit(): void {
    //Comment on the line below to avoid the load of the recipes automatically.
    this.dataStorageService.fetchRecipes().subscribe();
    this.userSub = this.authService.userSubject.subscribe(user => {
      console.log(this.constructor.name + ' - This is the subscribed user.', user);
      //The casting of user with the not operator is necesary to convert the object into a boolean.
      //this.isAuthenticated = !user ? false : true;
      //Here is a shortcut of the previous line
      //this.isAuthenticated = !!user;
      //Here is an alternative to convert the object into any type and therefore will be converted to boolean because of the casting of isAuthenticated.
      //Found on : https://stackoverflow.com/questions/20093613/typescript-conversion-to-boolean
      this.isAuthenticated = <any>user;
    });
  }

  /*
  onSelect(feature: string) {
    //console.log('The value of feature is ' + feature);
    this.featureSelected.emit(feature);
  }
  */

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    alert('The recipes are loaded');
  }

  ngOnDestroy() {
    this.authService.userSubject.unsubscribe();
  }
}
