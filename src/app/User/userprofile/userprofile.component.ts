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
    private userService: UserService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private datashare: DatashareService
  ) { }
  access: boolean = false;
  data: any;
  base64String: any;
  id!: number;
  image: any;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['userId'];
    this.getUserById(this.id);
  }
  getUserById(Id: number) {
    this.userService.getUsersById(Id).subscribe((res) => {
      this.data = res;
      if (this.data.roleId <= 2) {
        this.access = false;
      } else {
        this.access = true;
      }
      this.data.base64 = this.data.base64 + "," + this.data.image
    });
  }

  getOption() {
    this.id = this.activatedRoute.snapshot.params['userId'];
  }
}