import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class HeadGuard implements CanActivate {

  constructor(private auth: LoginService, private toastService: HotToastService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean> | boolean | UrlTree {
    if (this.auth.IsHead) { console.log("Head"); return true; }
    else {
      this.toastService.warning("You're Unauthorized");
      window.location.replace('/Home');
      return false;
    }
  }

}
