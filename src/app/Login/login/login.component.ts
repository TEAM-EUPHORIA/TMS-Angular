import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { baseurl } from 'src/app/URL';


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
  loginform = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern("^([0-9a-zA-Z.]){3,}@[a-zA-z]{3,}(.[a-zA-Z]{2,}[a-zA-Z]*){0,}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(3),
    ])
  })

  OnSubmit() {
    this.http.post(baseurl + "Auth/login", this.Login).
      subscribe({

        next: (res: any) => {

          localStorage.setItem("Token", res.token);

          this.toastService.success("Login Successful")

          setTimeout(() => {

            window.location.replace("/Home")

          }, 1000);

        },

        error: (err: any) => {

          if (err["error"] == 'Unauthorized user') {

            this.toastService.error(err["error"])

          }

        }

      })
  }

  showToast() {
    this.toastService.success('Login Successfully')
  }
}
