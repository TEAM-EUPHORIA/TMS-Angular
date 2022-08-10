import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    public route: Router
  ) {}

  //Storing response data from the server
  data: any;

  // User Id passed from list of user(trainee, trainer, reviewer)
  userId: any;

  //Breadcrumbs
  breadcrumbs = this.route.url.split('/').splice(1);

  //Component initialization
  ngOnInit(): void {
    this.userId = this.router.snapshot.params['id'];
    if (this.userId != 0 && this.userId != undefined)
      this.getUserProfile(this.userId);
    else if (this.userId == null || this.userId == undefined)
      this.getUserById();
    else window.location.replace('/PageNotFound');
    if (this.breadcrumbs.length > 1) this.breadcrumbs.pop();
  }

  // Gets profile of Current user
  getUserById() {
    this.http.get<any>(baseurl + 'User').subscribe((res) => {
      this.data = res;
      this.data.base64 = this.data.base64 + ',' + this.data.image;
    });
  }

  // Gets profile from list of user
  getUserProfile(id: number) {
    this.http.get<any>(baseurl + `User/${id}`).subscribe((res) => {
      this.data = res;
      this.data.base64 = this.data.base64 + ',' + this.data.image;
    });
  }
}
