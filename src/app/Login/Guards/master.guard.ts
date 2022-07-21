import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { GUARD } from 'src/app/Guards';
import { LoginService } from '../login.service';
import { CoordinatorGuard } from './coordinator.guard';
import { HeadGuard } from './head.guard';
import { ReviewerGuard } from './reviewer.guard';
import { TraineeGuard } from './trainee.guard';
import { TrainerGuard } from './trainer.guard';


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

    console.warn(this.guards);
    console.warn(this.guards.length);

    for (var i = 0; i < this.guards.length; i++) {
      console.warn(this.guards[i]);
      let guard = new this.guards[i](this.auth, this.toast);
      this.result = guard.canActivate(this.route, this.state);
      if (this.result) break;
      else continue;
    }
    console.warn(this.result);
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