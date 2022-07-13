import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient) { }
  baseurl = "https://localhost:5001/Auth/"

  // roleId: number;

  public IsloggedIn = localStorage.getItem('token') != null;
  public IsHead = false;
  public IsCoordinator = false;
  public IsTrainer = false;
  public IsTrainee = false ;
  public IsReviewer = false;
  public temp = sessionStorage.getItem('UserId') as string;
  public userId = Number.parseInt(this.temp);

  userAuthorization(UserName: string, Password: string): Observable<any> {
    var data = {
      Email: UserName,
      Password: Password
    };
    console.log(data)
    return this.http.post(this.baseurl + `login`, data);
  }

  CheckUser() {
    
    this.IsHead = (this.getRole() == 'Training Head')

    this.IsCoordinator = (this.getRole() == 'Training Coordinator')

    this.IsTrainer = (this.getRole() == 'Trainer')

    this.IsTrainee = (this.getRole() == 'Trainee')

    this.IsReviewer = (this.getRole() == 'Reviewer')
  }

  CheckLogin() {
    return this.IsloggedIn;
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRole() {    
    if (this.getToken() != null) {
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
    if (this.getToken() != null) {
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
    if (this.getToken() != null) {
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
