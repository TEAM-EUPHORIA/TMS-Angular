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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.route = route;
    this.state = state;
    this.guards = this.route.data['guard'];
    if (this.auth.IsloggedIn) {
      console.warn(this.guards)
      this.executeGuards();
      return true
    }
    else {
      return false;
    }
  }

  private executeGuards(guardIndex: number = 0): Promise<boolean> {
    return this.activateGuard(this.guards[guardIndex])
      .then(() => {
        if (guardIndex < this.guards.lengthx) {
          console.warn("Logined");
          return this.executeGuards(guardIndex + 1);
        } else {
          return Promise.resolve(true);
        }
      })
      .catch(() => {
        return Promise.reject(false);
      });
  }

  async activateGuard(key: any): Promise<any> {
    let guard !: HeadGuard | CoordinatorGuard | TrainerGuard | TraineeGuard | ReviewerGuard;
    console.warn(key);
    switch (key) {
      case GUARD.head:
        guard = new HeadGuard(this.auth, this.toast);
        return guard.canActivate(this.route, this.state);
      case GUARD.co:
        guard = new CoordinatorGuard(this.auth, this.toast);
        return guard.canActivate(this.route, this.state);
      case GUARD.trainer:
        guard = new TrainerGuard(this.auth, this.toast);
        return guard.canActivate(this.route, this.state);
      case GUARD.trainee:
        guard = new TraineeGuard(this.auth, this.toast);
        return guard.canActivate(this.route, this.state);
      case GUARD.reviewer:
        guard = new ReviewerGuard(this.auth, this.toast);
        return guard.canActivate(this.route, this.state);
    }
  }

}
