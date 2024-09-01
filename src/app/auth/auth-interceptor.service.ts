import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.userSubject.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
      let httpParams = req.params.append('auth', user.token);
      let enrichedRequest = req.clone({params: httpParams});
      return next.handle(enrichedRequest);
    }));

  }
}
