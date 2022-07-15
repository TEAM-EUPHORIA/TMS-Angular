import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(
    private http : HttpClient,
    public sanitizer: DomSanitizer,
    private router: ActivatedRoute,
  ) {}
  access: boolean = false;
  data: any;
  base64String: any;
  id!: number;
  image: any;
  userId : any;

  ngOnInit(): void {
    this.userId = this.router.snapshot.params["id"]
    if(this.userId != undefined) 
      this.getUserProfile(this.userId);
    else
      this.getUserById();
  }
  getUserById() {
    this.http.get<any>(baseurl + "User").subscribe(res => {
      this.data = res; 
      this.data.base64 = this.data.base64+","+this.data.image;
    });
  }
  getUserProfile(id : number){
    this.http.get<any>(baseurl + `User/${id}`).subscribe(res => {
      this.data = res;
      this.data.base64 = this.data.base64+","+this.data.image;
    });
  }
}