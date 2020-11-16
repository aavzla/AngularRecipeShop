import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //loadedFeature: string;

  constructor(
    private authService: AuthService
  ) {
    //this.loadedFeature = 'recipe';
  }

  /*
  onNavigate(feature: string) {
    //console.log('this is the value of feature ' + feature);
    this.loadedFeature = feature;
  }
  */

  ngOnInit() {
    //Earliest call to check the auth state.
    this.authService.autoLogin();
  }
}
