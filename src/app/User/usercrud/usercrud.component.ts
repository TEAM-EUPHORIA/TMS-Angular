import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DepartmentService } from 'src/app/Department/department.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.css']
})
export class UsercrudComponent implements OnInit {
  removeimage = true;
  option: string = 'choose a image';
  constructor(private userService: UserService, private dservice: DepartmentService, private router: Router, public sanitizer: DomSanitizer, private route: ActivatedRoute, private toastService: HotToastService) { }

  departments: any[] = [];
  breadcrumbs = this.router.url.slice(1).split('/');
  pageTitle = this.router.url.slice(1).split('/')[1]
  pageAction = this.router.url.slice(1).split('-')[1]
  redirect = this.router.url.slice(1).split('-')[1]
  edit = false;
  showDept = false;
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
    roleId: 0,
    departmentId: null,
    fullName: '',
    userName: '',
    password: '',
    email: '',
    base64: '',
  };

  ngOnInit(): void {
    this.GetallDepartment();
    if (this.pageTitle.indexOf('Co-Ordinator') == -1)
      this.showDept = true

    this.user.id = this.route.snapshot.params["id"]
    if (this.user.id != undefined) {
      this.userService.getUsersById(this.user.id).subscribe(res => {
        this.user = res;
        this.user.base64 = this.user.base64 + "," + this.user.image;
        this.edit = true
        this.option = 'replace image'
      })
    }
  }

  OnSubmit() {
    this.setRole()
    console.log(this.user)
    if (this.pageAction = 'Add') {
      this.userService.postUser(this.user).subscribe({
        next: (res: any) => {
          window.location.replace(`${this.redirect}`)
          this.toastService.success("The User was created successfully.")
        },
        error: (err: any) => {
          this.serverSideErrorMsgs(err);
        }
      })
    }
    if (this.pageAction = 'Update') {
      this.userService.updateUser(this.user).subscribe({
        next: (res: any) => {
          this.redirect = this.redirect.split('/')[0]
          window.location.replace(`${this.redirect}`)
          this.toastService.success("The User was updated successfully.")
        },
        error: (err: any) => {
          this.serverSideErrorMsgs(err);
        }
      })
    }
  }
  private navigateToListPage() {
    window.location.replace(`/${this.redirect.split('/')[0]}`);
    console.log(this.redirect)
    this.showToast()
  }
  private serverSideErrorMsgs(err: any) {
    console.warn(err["error"]);
    const errors = err["error"];
    Object.keys(errors).forEach(prop => {
      const formControl = this.userform.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors[prop]
        });
        console.warn(this.userform.controls['email'].getError('serverError'));
      }
    });
  }
  showToast() {
    this.toastService.success(this.pageAction + 'ed')
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.user.base64 = reader.result.toString()
    };
    this.option = 'replace image'
  }
  GetallDepartment() {
    this.dservice.getAllDepartment().subscribe((res) => this.departments = res)
  }

  setRole() {
    console.log(this.redirect)
    switch (this.redirect) {
      case 'Co':
        this.user.roleId = 2
        this.redirect = 'Co-Ordinator'
        break;
      case 'Trainer':
        this.user.roleId = 3
        break;
      case 'Trainee':
        this.user.roleId = 4
        break;
      case 'Reviewer':
        this.user.roleId = 5
        break;

      default:
        break;
    }
  }
  changeimage() {
    this.removeimage = false;
  }
}