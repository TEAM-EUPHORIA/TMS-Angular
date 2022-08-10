import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { if(this.IsloggedIn) this.CheckUsers(); }

  public IsloggedIn = localStorage.getItem('Token') != null;
  public IsHead = false;
  public IsCoordinator = false;
  public IsTrainer = false;
  public IsTrainee = false ;
  public IsReviewer = false;

  CheckUsers() {
    
    this.IsHead = (this.getRole() == 'Training Head')

    this.IsCoordinator = (this.getRole() == 'Training Coordinator')

    this.IsTrainer = (this.getRole() == 'Trainer')

    this.IsTrainee = (this.getRole() == 'Trainee')

    this.IsReviewer = (this.getRole() == 'Reviewer')
  }

  getToken() {
    return localStorage.getItem('Token') || '';
  }

  getRole() {    
    if (this.getToken() != undefined) {
      var _token = this.getToken();
      var extract = _token.split('.')[1];
      var _atobtoken = atob(extract);
      var _finaldata = JSON.parse(_atobtoken);
      return _finaldata.Role;
    } else {
      return '';
    }
  }
  getRoleId() {
    if (this.getToken() != undefined) {
      var _token = this.getToken();
      var extract = _token.split('.')[1];
      var _atobtoken = atob(extract);
      var _finaldata = JSON.parse(_atobtoken);
      return _finaldata.RoleId;
    } else {
      return '';
    }
  }
  getId() {
    if (this.getToken() != undefined) {
      var _token = this.getToken();
      var extract = _token.split('.')[1];
      var _atobtoken = atob(extract);
      var _finaldata = JSON.parse(_atobtoken);
      return _finaldata.UserId;
      } else {
        return '';
      }
  }
}
