
import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { LoginService } from './login.service';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private loginSer: LoginService, private router: Router, private route: ActivatedRoute) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree | boolean {

            return this.loginSer.user.pipe(take(1), map(user => {
                const isAuthenticated = !!user;
                if (isAuthenticated) {
                    return true;
                } else {
                   return this.router.createUrlTree(['/login']);
                }
            }));
        }
}
