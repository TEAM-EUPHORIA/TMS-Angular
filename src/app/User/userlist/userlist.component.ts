import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';
import { UserService } from '../user.service';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  constructor(public ls: LoginService, private ts: HotToastService, private router: Router, private http: HttpClient, private userservice: UserService) { }
  title: any;
  searchuser = '';
  _dept = ''
  data: any
  showDept = false;
  dpt = false
  dept: any[] = [];
  users: any[] = [];
  usersCopy: any[] = [];
  edit = false
  page: number = 1;
  totalLength: any;
  roleId: any;
  disableUser(id: any) {
    console.warn(id)
    this.userservice.disableUser(id).subscribe(res => {
      this.data = res
      console.log(res)
    })
    this.showToast();
    window.location.reload();
  }
  ngOnInit(): void {
    this.title = this.router.url.slice(1)
    this.dpt = this.title != 'Co-Ordinator'
    switch (this.title) {
      case 'Co-Ordinator':
        this.getUsers(2)
        if (this.ls.IsHead) this.edit = true;
        this.showDept = false;
        break;
      case 'Trainer':
        this.getUsers(3)
        if (this.ls.IsCoordinator) this.edit = true;
        this.showDept = true;
        break;
      case 'Trainee':
        this.getUsers(4)
        if (this.ls.IsCoordinator) this.edit = true;
        this.showDept = true;
        break;
      case 'Reviewer':
        this.getUsers(5)
        if (this.ls.IsCoordinator) this.edit = true;
        this.showDept = true;
        break;
      default:
        break;
    }
    this.getDepartments()
    this.getUsers(this.roleId)
  }
  getDepartments() {
    this.http.get(baseurl + `Department/departments`).subscribe((res: any) => {
      this.dept = res
    })
  }
  getUsers(roleId: any) {
    this.http.get(baseurl + `User/role/${roleId}`).subscribe((res: any) => {
      console.warn(roleId)
      this.users = res
      this.usersCopy = this.users
    })
  }
  showToast() {
    this.ts.error('Disabled')
  }
  myfunction(id: number) {
    let text = "Are you sure you want to disable the user";
    if (confirm(text) == true) {
      this.disableUser(id)
    } else {
      text = "You canceled!";
    }
  }
  filterByDepartment() {
    const item = document.getElementById("departmentId") as HTMLSelectElement
    if (item.value != '') {
      this.users = this.usersCopy.filter(u => u.departmentId == item.value)
    } else {
      this.users = this.usersCopy
    }
    this.updateCurrentPageAndTotalLength();
  }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.users.length;
  }
  filterByName() {
    const search = document.getElementById("search") as HTMLInputElement
    const item = document.getElementById("departmentId") as HTMLSelectElement
    if (item != null) {
      if (search.value != '' && item.value != '') {
        this.users = this.usersCopy.filter((user: any) => user.fullName.toLowerCase().includes(search.value.toLowerCase()) && user.departmentId == item.value)
      } else if (search.value != '' && item.value == '') {
        this.users = this.usersCopy.filter((user: any) => this.getFilteredUsers(user, search))
      } else if (search.value == '' && item.value != '') {
        this.users = this.usersCopy.filter((user: any) => user.departmentId == item.value)
      } else if (search.value == '' && item.value == '') {
        this.users = this.usersCopy
      }
    }
    else {
      if (search.value != '') {
        this.users = this.usersCopy.filter((user: any) => this.getFilteredUsers(user,search))
      }else{
        this.users = this.usersCopy
      }
    }
    this.updateCurrentPageAndTotalLength();
  }
  
  private getFilteredUsers(user: any, search: HTMLInputElement): any {
    return user.fullName.toLowerCase().includes(search.value.toLowerCase());
  }
}
