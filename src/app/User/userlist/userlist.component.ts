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
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  constructor(
    public auth: LoginService,
    private toastservice: HotToastService,
    private router: Router,
    private http: HttpClient,
    private userservice: UserService
  ) {}
  //sets title UserList for the page
  title: any;
  data: any;
  showDept = false;
  dpt = false;
  // stores list of department from server
  dept: any[] = [];
  users: any[] = [];
  usersCopy: any[] = [];
  edit = false;

  // Pagination settings
  page: number = 1;
  totalLength: any;

  // Function to disable User
  disableUser(id: any) {
    this.userservice.disableUser(id).subscribe((res) => {
      this.data = res;
    });
    this.showToast();
    window.location.reload();
  }

  //Component initialization
  ngOnInit(): void {
    this.title = this.router.url.slice(1);
    this.dpt = this.title != 'Co-Ordinator';
    switch (this.title) {
      case 'Co-Ordinator':
        this.getUsers(2);
        if (this.auth.IsHead) this.edit = true;
        this.showDept = false;
        break;
      case 'Trainer':
        this.getUsers(3);
        if (this.auth.IsCoordinator) this.edit = true;
        this.showDept = true;
        break;
      case 'Trainee':
        this.getUsers(4);
        if (this.auth.IsCoordinator) this.edit = true;
        this.showDept = true;
        break;
      case 'Reviewer':
        this.getUsers(5);
        if (this.auth.IsCoordinator) this.edit = true;
        this.showDept = true;
        break;
      default:
        window.location.replace('/InvalidRequest');
        break;
    }
    this.getDepartments();
  }

  // Gets list of department to filter
  getDepartments() {
    this.http.get(baseurl + `Department/departments`).subscribe((res: any) => {
      this.dept = res;
    });
  }
  // Gets list of users with speccified role Id
  getUsers(roleId: any) {
    this.http.get(baseurl + `User/role/${roleId}`).subscribe((res: any) => {
      this.users = res;
      this.usersCopy = this.users;
    });
  }
  showToast() {
    this.toastservice.error('Disabled');
  }

  //Display dialog for Disable conformation
  myfunction(id: number) {
    if (id != 0) {
      let text = 'Are you sure you want to disable the user';
      if (confirm(text) == true) {
        this.disableUser(id);
      } else {
        text = 'You canceled!';
      }
    } else {
      window.location.replace('/InvalidRequest');
    }
  }

  // Filter Users by Department selected
  filterByDepartment() {
    const item = document.getElementById('departmentId') as HTMLSelectElement;
    if (item.value != '') {
      this.users = this.usersCopy.filter((u) => u.departmentId == item.value);
    } else {
      this.users = this.usersCopy;
    }
    this.updateCurrentPageAndTotalLength();
  }

  // Pagination update function
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.users.length;
  }

  // Filter functionn for Search and Department dropdown
  filterByName() {
    const search = document.getElementById('search') as HTMLInputElement;
    const item = document.getElementById('departmentId') as HTMLSelectElement;
    if (item != null) {
      if (search.value != '' && item.value != '') {
        this.users = this.usersCopy.filter(
          (user: any) =>
            user.fullName.toLowerCase().includes(search.value.toLowerCase()) &&
            user.departmentId == item.value
        );
      } else if (search.value != '' && item.value == '') {
        this.users = this.usersCopy.filter((user: any) =>
          this.getFilteredUsers(user, search)
        );
      } else if (search.value == '' && item.value != '') {
        this.users = this.usersCopy.filter(
          (user: any) => user.departmentId == item.value
        );
      } else if (search.value == '' && item.value == '') {
        this.users = this.usersCopy;
      }
    } else {
      if (search.value != '') {
        this.users = this.usersCopy.filter((user: any) =>
          this.getFilteredUsers(user, search)
        );
      } else {
        this.users = this.usersCopy;
      }
    }
    this.updateCurrentPageAndTotalLength();
  }

  // Filter Users by Search text
  private getFilteredUsers(user: any, search: HTMLInputElement): any {
    return user.fullName.toLowerCase().includes(search.value.toLowerCase());
  }
}
