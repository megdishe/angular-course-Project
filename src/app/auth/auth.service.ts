import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind?: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASqECpNt8MeLSwCjpFtBINQ_EYspwPC_E',
      {email: email, password: password, returnSecureToken: true})
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleError)
      );
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _expirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    let loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._expirationDate));
    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
      const expirationDuration = new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration);
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASqECpNt8MeLSwCjpFtBINQ_EYspwPC_E',
      {email: email, password: password, returnSecureToken: true})
      .pipe(
        tap(this.handleAuthentication.bind(this)),
        catchError(this.handleError)
      );
  }

  private handleAuthentication(responseData: AuthResponseData) {
    let expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate);
    console.log(this.userSubject)
    console.log(user)
    this.userSubject.next(user);
    this.autoLogout(+responseData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred'
    switch (error?.error?.error?.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid email address'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User disabled';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already in use. Please try again.'
        break;
    }
    return throwError(errorMessage)
  }
}
