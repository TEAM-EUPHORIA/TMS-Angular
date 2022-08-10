import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any = {};
  constructor(
    public auth: LoginService,
    public sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  // Component Initialization
  ngOnInit(): void {
    this.http.get(baseurl + `User/Dashboard`).subscribe((res) => {
      this.data = res;
      this.data.Base64 = this.data.Base64 + ',' + this.data.Image;
    });
  }
}
