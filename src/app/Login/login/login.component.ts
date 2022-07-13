import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router, private routing: Router, private toastService: HotToastService) { }
  Tokendata: any;
  public Role: any;
  public RoleId: any;
  public currentId: any;
  Login: any = {
    Username: '',
    Password: ''
  }

  ngOnInit(): void { }

  OnSubmit() {
    this.loginservice.userAuthorization(this.Login.Username, this.Login.Password).subscribe(result => {
      if (result != null) {
        this.Tokendata = result.token
        this.Role = result.Role
        localStorage.setItem('token',this.Tokendata);
        this.router.navigate([''])
        this.showToast();
      }
    }, err => {
    })
  }
  showToast() {
    this.toastService.success('Login Successfully')
  }
}
