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

    for (var i = 0; i < this.guards.length; i++) {
      let guard = new this.guards[i](this.auth);
      this.result = guard.canActivate(this.route, this.state);
      if (this.result) break;
      else continue;
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



  // async activateGuard(key: any): Promise<any> {
  //   let guard !: HeadGuard | CoordinatorGuard | TrainerGuard | TraineeGuard | ReviewerGuard;
  //   console.warn(key);
  //   switch (key) {
  //     case GUARD.head:
  //       guard = new HeadGuard(this.auth, this.toast);
  //       return guard.canActivate(this.route, this.state);
  //     case GUARD.co:
  //       guard = new CoordinatorGuard(this.auth, this.toast);
  //       return guard.canActivate(this.route, this.state);
  //     case GUARD.trainer:
  //       guard = new TrainerGuard(this.auth, this.toast);
  //       return guard.canActivate(this.route, this.state);
  //     case GUARD.trainee:
  //       guard = new TraineeGuard(this.auth, this.toast);
  //       return guard.canActivate(this.route, this.state);
  //     case GUARD.reviewer:
  //       guard = new ReviewerGuard(this.auth, this.toast);
  //       return guard.canActivate(this.route, this.state);
  //   }
  //   return guard.canActivate(this.route, this.state);
  // }

}