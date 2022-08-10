import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class MasterGuard implements CanActivate {
  constructor(private auth: LoginService, private toast: HotToastService) { }

  private route !: ActivatedRouteSnapshot;
  private state !: RouterStateSnapshot;
  guards !: any;
  result: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.route = route;
    this.state = state;
    this.guards = this.route.data['guard'];
    
    if(this.guards != null){
      for (var i = 0; i < this.guards.length; i++) {
        this.result = this.guards[i](this.auth).canActivate(this.route, this.state);
        if (this.result) break;
        else continue;
      }
    }

    if (this.result) {
      return true;
    }
    else {
      this.toast.warning("You're Unauthorized");
      setTimeout(() => {
        window.location.replace('/Home')
      }, 500);
      return false;
    }
  }
}