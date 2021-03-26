import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { SocialAuthService } from '../service/social-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth :SocialAuthService,
    private authService: AuthService, 
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    var isAuth = this.authService.getIsAuth();
    if(this.auth.user$ ){
      isAuth= true;
    }
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    return isAuth;
  }
}