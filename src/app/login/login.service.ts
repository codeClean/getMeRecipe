import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthenticationResponce {
    kind: string;
    idToken: string;
    email: string;
    refrechToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
    logoutTimer: any = null;
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) { }

    // sign up service
    onSignUp(email: string, password: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmh60yPbdmY5zKW3ZTpvgEPUteuGEpMhI',
            {
                email,
                password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                  this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                  );
                })
              );
          }
    // Login service
    onLogin(email: string, password: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.post<any>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmh60yPbdmY5zKW3ZTpvgEPUteuGEpMhI',
            {
                email,
                password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError),
            tap(resData => {
              this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
              );
            })
          );
    }

    onLogOut() {
      this.user.next(null);
      this.router.navigate(['/login']);
      localStorage.removeItem('userData');
      console.log(this.logoutTimer);
      
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
      }
      console.log(this.logoutTimer);

      this.logoutTimer = null;
    }
    onAutoLOgin() {
     const user: {
          email: string,
          localId: string,
          idToken: string,
          expiresIn: string } = JSON.parse(localStorage.getItem('userData'));
     if (!user) { return; }

     const loadedUser = new User(user.email, user.localId, user.idToken, new Date(user.expiresIn));

     if (loadedUser.token) {
       this.user.next(loadedUser);
       const expirationTemp = new Date(user.expiresIn).getTime();
       const remainingTime = expirationTemp - (new Date().getTime());
       console.log(remainingTime);
       this.onAutoLogout(remainingTime);
     }
    }

    onAutoLogout(expirationDate) {
     this.logoutTimer = setTimeout(() => {
        this.onLogOut();
      }, expirationDate);
    }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log(expirationDate);
    this.onAutoLogout(expirationDate);
  }

    private handleError(errorResponse: HttpErrorResponse) {
        {
            let errorMessage = ' unknown error occured';
            if (!errorResponse.error || !errorResponse.error.error) {
                return errorMessage;
            }
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS': errorMessage = ' This email exists already ';
                                     break;
                case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist, sign up if you are new ';
                                        break;
                case 'INVALID_PASSWORD': errorMessage = 'The password is not correct ';
                                         break;
                default:
                    break;
            }
            return throwError(errorMessage);

        }
    }
}
