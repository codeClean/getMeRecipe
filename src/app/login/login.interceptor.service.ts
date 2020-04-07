import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';
import { take, exhaust, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginIterceptorService implements HttpInterceptor {

    constructor(private loginSer: LoginService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.loginSer.user.pipe(take(1), exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }
            const modified = req.clone({ params: new HttpParams().set('auth', user.token) });

            return next.handle(modified);
        })
        );
    }
}
