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

  constructor(private dservice: DepartmentService, public auth: LoginService, private toastService: HotToastService) { }

  role!: string;
  data: any[]=[];
  _dept = '';
  page: number = 1;
  totalLength: any;
  department:any[]=[];
  departmentlist:any[]=[];
  departmentlistcopy:any[]=[];

  
  Editable = false;
  roleid: number = this.auth.getRoleId();

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
      this.departmentlist = res
      this.departmentlistcopy = res
      console.log(res)
    })
  }
  disableDepartment(id: number) {
    this.dservice.disableDepartment(id).subscribe(() => this.GetallDepartment())
    this.showToast();
  }
  showToast() {
    this.toastService.error('Disabled')
  }
 
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.departmentlist.length;
  }
  filterByName(search: HTMLInputElement) {
    if (search.value != '') {
      console.log(this.departmentlist)
      this.departmentlist = this.departmentlistcopy.filter((department: any) => department.name.toLowerCase().includes(search.value.toLowerCase()))
      this.updateCurrentPageAndTotalLength();
    } else {
      this.departmentlist = this.departmentlistcopy
      this.updateCurrentPageAndTotalLength();
    }
  }
}