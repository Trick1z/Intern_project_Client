// import { CanActivateFn } from '@angular/router';

// export const authenticationGuard: CanActivateFn = (route, state) => {
//   return true;
// };


import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      // console.log("active :");

    if (localStorage.getItem('user')) {
      // console.log('aut true');


      return true;
    }

    // console.log('aut false');s

    this.router.navigate(['/test'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
