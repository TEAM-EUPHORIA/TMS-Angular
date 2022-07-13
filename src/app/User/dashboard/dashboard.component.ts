import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private userService: UserService,
    private auth: LoginService,
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) { }

  id: number = this.auth.getId();
  role = this.auth.getRole();

  userdata: any;
  deptdata: any;
  coursedata: any;
  reviewdata: any;
  data: any;
  base64String: any;
  userID: any;

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userId'];
    this.DashboardData();
  }

  DashboardData() {
    this.userService.getDashboard().subscribe((res) => {
      this.data = res;
      console.warn(this.data)
      this.data.Base64 = this.data.Base64 + "," + this.data.Image
    });
  }
}