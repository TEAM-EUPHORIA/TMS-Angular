import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private toastService: HotToastService,
    private http: HttpClient) { }
  Tokendata: any;
  public Role: any;
  public RoleId: any;
  public currentId: any;

  //Response from server is stored
  response: any;
  Responsemsg: any;
  //Error msg to be stored from server
  errormsg: any;
  Emailmsg: any;
  Passwordmsg: any;

  //model for Login
  Login: any = {
    Email: '',
    Password: ''
  }

  OnSubmit() {
    console.log(this.Login);
    this.http.post("https://localhost:5001/Auth/login", this.Login).
    subscribe({

      next: (res: any) => {

        localStorage.setItem("Token", res.token);

        this.toastService.success("Login Success")

        setTimeout(() => {

          window.location.replace("/Home")

        }, 200);

      },

      error: (err: any) => {

        if (err["error"] == 'Unauthorized user') {

          this.toastService.error(err["error"])

        }

      }

    })
    
    // .subscribe(res => {
    //   this.response = res;
    //   console.log(this.response.token);
    //   if (this.response != null) {
    //     localStorage.setItem("Token", this.response.token);
    //     window.location.replace("/")
    //   }
    //   this.Responsemsg = "LoggedIn Successfully"
    //   window.location.replace("/")
    // }, err => {
    //   this.errormsg = err;
    //   if (this.errormsg.error.errors.Email[0] != undefined) {
    //     this.Emailmsg = this.errormsg.error.errors.Email[0];
    //   }
    //   if (this.errormsg.error.errors.Password[0] != undefined) {
    //     this.Passwordmsg = this.errormsg.error.errors.Password[0];
    //   }
    // })
    // setTimeout(() => this.showToast(), 2000)
  }

  showToast() {
    this.toastService.success('Login Successfully')
  }
}
