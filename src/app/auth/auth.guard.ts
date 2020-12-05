import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    //This is the right implementation for a redirection based on the user auth state.
    return this.authService.userSubject.pipe(
      //This take will avoid to listening to the Observable more than one time with unsubscribing automatically and therefore avoid any redirections unwanted.
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })

    //Old way of doing and It works, but this could lead to race conditions with multiple redirects that kind of interfere with each other in edge scenarios.
    //return this.authService.userSubject.pipe(
    //  map(user => {
    //    return !!user;
    //  }),
    //  tap(isAuth => {
    //    if (!isAuth) {
    //      this.router.navigate(['/auth']);
    //    }
    //  })
    )
  }


}
