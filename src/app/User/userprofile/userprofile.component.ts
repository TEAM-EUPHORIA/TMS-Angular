import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(
    private http : HttpClient,
    private userService: UserService,
    public sanitizer: DomSanitizer,
    private route: Router,
    private router: ActivatedRoute,
    // private datashare: DatashareService
  ) {this.userId = this.route.getCurrentNavigation()?.extras.state?.['userId']; }
  access: boolean = false;
  data: any;
  base64String: any;
  id!: number;
  image: any;
  userId : any;

  ngOnInit(): void {
    console.log(this.userId)
    if(this.userId != undefined) this.getUserProfile(this.userId);
    else
    this.getUserById();
  }
  getUserById() {
    this.http.get<any>("https://localhost:5001/User").subscribe(res => {
      this.data = res; 
      this.data.base64 = this.data.base64+","+this.data.image;
    });
  }
  getUserProfile(id : number){
    this.http.get<any>("https://localhost:5001/User/"+id).subscribe(res => {
      this.data = res;
      this.data.base64 = this.data.base64+","+this.data.image;
    });
  }
}