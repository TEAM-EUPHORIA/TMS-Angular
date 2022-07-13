import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { DepartmentService } from 'src/app/Department/department.service';
import { LoginService } from 'src/app/Login/login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  canAdd!: boolean;
  constructor(private auth: LoginService,
    private user: UserService,
    private route: ActivatedRoute,
    private dservice: DepartmentService,
    private toastService: HotToastService) { }

  searchuser!: string;
  searchdept!: string;
  data$!: Observable<any>;
  dept: any;
  users$!: Observable<any>;
  users: any;
  _dept!: '';
  _user!: '';
  page: number = 1;
  totalLength: any;
  roleId!: number;
  Role!: string;
  option!: number;
  editable = false;
  dpt = false;
  title!: string;

  ngOnInit(): void {
    this.option = this.route.snapshot.params['option'];
    var roleId: number = + this.option;
    if (this.roleId == 2) this.editable = true;
    if (this.roleId == 1) {
      if (this.option == 2) this.editable = true;
      else this.editable = false
    }
    if (roleId > 2) this.dpt = true;

    this.route.params.subscribe(p => {
      this.user.getAllUsersByRoleId(p["option"]).subscribe(res => {
        this.users = res;
        this.option = p["option"];
        this.title = this.users[0].role.name
        this.roleId = this.auth.getRoleId();
        if (this.roleId == 2) {
          this.editable = true;
          this.canAdd = true;
        }
        if (this.roleId == 1) {
          if (this.option == 2) {
            this.canAdd = true;
            this.editable = true;
          }
          else {
            this.canAdd = false
            this.editable = false
          }

        }
      })
    })
    this.GetAllDepartment();
    this.GetUsers()
  }

  private setEditable(roleId: number) {
    if (this.roleId == 2)
      this.editable = true;
    if (this.roleId == 1) {
      if (this.option == 2)
        this.editable = true;
    }
    if (roleId > 2)
      this.dpt = true;
  }

  SearchActive(search: string) {
    this.searchuser = search;
  }
  GetUsers() {
    this.user.getAllUsersByRoleId(this.option).subscribe(res => {
      this.users = res;
      this.title = this.users[0].role.name
    })
  }
  GetAllDepartment() {
    this.dservice.getAllDepartment().subscribe(res => {
      this.dept = res
    })
  }
  disableUser(id: number) {
    this.user.disableUser(id).subscribe(() => this.GetUsers())
    this.showToast();
  }
  showToast() {
    this.toastService.error('Disabled')
  }
}