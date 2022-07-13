import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from 'src/app/Department/department.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.css']
})
export class UsercrudComponent implements OnInit {

  constructor(private userService: UserService, private dservice: DepartmentService, private routing: Router, private route: ActivatedRoute, public sanitizer: DomSanitizer) { }

  RoleId = null;
  userId!: number;
  Title!: string;
  Editable: boolean = false;
  Titles = ["Training Head", "Coordinator", "Trainer", "Trainee", "Reviewer"];
  data: any;
  dept: any;
  _dept: any = null;
  access!: boolean;
  Text!: string;
  userform = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3)


    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.minLength(3)
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(3)

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(8)
    ]),
    department: new FormControl('', [
      Validators.required,
    ])

  })
  user: any = {
    id: 0,
    roleId: this.RoleId,
    departmentId: null,
    fullName: '',
    userName: '',
    password: '',
    email: '',
    base64: '',
  };

  ngOnInit(): void {
    this.GetallDepartment();
    this.RoleId = this.route.snapshot.params['roleId'];
    this.userId = this.route.snapshot.params['userId'];
    if (this.RoleId != null) {
      this.Text = "Add";
      this.user.roleId = Number.parseInt(this.route.snapshot.params['roleId']);
      this.TitleDisplay(this.RoleId);
    } else if (this.userId != null) {
      this.Text = "Edit";
      this.EditDetails(this.userId);
    }
  }
  //  
  TitleDisplay(id: number) {
    if (id <= 2) {
      if (id == 1) this.Title = this.Titles[0];
      else this.Title = this.Titles[1];
      this.access = false;
    } else {
      if (id == 3) this.Title = this.Titles[2];
      else if (id == 4) this.Title = this.Titles[3];
      else this.Title = this.Titles[4];
      this.access = true;
    }
  }
  EditDetails(userid: number) {
    this.Editable = true;
    this.userService.getUsersById(userid).subscribe(res => {
      this.user = res;
      this.user.base64 = this.user.base64 + "," + this.user.image
      this.TitleDisplay(this.user.roleId);
    })
  }
  OnSubmit() {
    this.user.departmentId = this._dept;
    if (this.RoleId != null) {
      this.userService.postUser(this.user).subscribe(res => {
      })
      setTimeout(() => { this.routing.navigateByUrl("/Userlist/" + this.RoleId) }, 5000)

    } else if (this.userId != null) {
      this.userService.updateUser(this.user).subscribe(res => {
      })
      setTimeout(() => { this.routing.navigateByUrl("/Userlist/" + this.user.role.id) }, 5000)
    }

  }
  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.user.base64 = reader.result.toString()
    };
  }
  GetallDepartment() {
    this.dservice.getAllDepartment().subscribe(res => {
      this.dept = res
    })
  }
}