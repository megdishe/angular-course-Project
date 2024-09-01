import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userSubject.pipe(take(1),
      map(user => {
        let isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      })
      // , tap(isAuthenticated => {
      //   if (!isAuthenticated) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }

}
