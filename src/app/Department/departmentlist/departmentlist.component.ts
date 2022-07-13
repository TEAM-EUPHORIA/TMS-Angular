import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from 'src/app/Login/login.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.css']
})
export class DepartmentlistComponent implements OnInit {

  constructor(private dservice: DepartmentService, private auth: LoginService, private toastService: HotToastService) { }

  role!: string;
  data: any;
  _dept = '';
  page: number = 1;
  totalLength: any;
  IsCoordinator: boolean = this.auth.IsCoordinator;
  IsHead: boolean = this.auth.IsHead;
  Editable = false;
  roleid: number = this.auth.roleId;

  ngOnInit(): void {
    this.roleid = this.auth.getRoleId();
    if (this.roleid == 1) {

    } else if (this.roleid == 2) {
      this.Editable = true;

    }
    this.GetallDepartment()
  }
  GetallDepartment() {
    this.dservice.getAllDepartment().subscribe(res => {
      this.data = res
    })
  }
  SearchActive(search: string) {
    this._dept = search;
  }
  disableDepartment(id: number) {
    this.dservice.disableDepartment(id).subscribe(() => this.GetallDepartment())
    this.showToast();
  }
  showToast() {
    this.toastService.error('Disabled')
  }
}