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
export class LoginComponent implements OnInit {
  
  constructor(private router: Router, private routing: Router, private toastService: HotToastService,
    private http : HttpClient) { }
    Tokendata: any;
    public Role: any;
    public RoleId: any;
    public currentId: any;

    //Response from server is stored
    response: any;
    Responsemsg : any;
    //Error msg to be stored from server
    errormsg : any;
    Emailmsg : any;
    Passwordmsg : any;

  //model for Login
  Login: any = {
    Email: '',
    Password: ''
  }

  ngOnInit(): void { }

  OnSubmit() {
    console.log(this.Login);
    this.http.post("https://localhost:5001/Auth/login",this.Login).subscribe(res => {
      this.response = res;
      console.log(this.response.token);
      if(this.response != null){
        localStorage.setItem("Token",this.response.token);
      }
      this.Responsemsg = "LoggedIn Successfully"
      this.router.navigate(['/Home'])
    },err => {
      this.errormsg = err;
      if(this.errormsg.error.errors.Email[0] != undefined){
        this.Emailmsg = this.errormsg.error.errors.Email[0];
      }
      if(this.errormsg.error.errors.Password[0] != undefined){
        this.Passwordmsg = this.errormsg.error.errors.Password[0];
      }
    })
  }
  showToast() {
    this.toastService.success('Login Successfully')
  }
}
