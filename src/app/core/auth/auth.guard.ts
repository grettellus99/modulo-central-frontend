import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthProviderService} from './auth-provider.service';
import {User} from '../user/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    user: User;
    constructor(
        private authProvider: AuthProviderService,
        private router: Router,
    ) {
        this.authProvider.subscribe(user => this.user = user);
    }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        // const { authorities } = route.data;
        const canActivate = !!this.user;
        if (!canActivate) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }}).then();
        }
        return canActivate;
    }

    // hasAuthorities( authorities: string[]): boolean {
    //     if (authorities) {
    //         return authorities.some(auth => !!this.user.authorities[auth]);
    //     }
    //     return false;
    // }
}
