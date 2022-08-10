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
  // Pagination Settngs
  page: number = 1;
  totalLength: any;
  // Department list Stored 
  departmentlist:any[]=[];
  // Copy of Departmentlist for filterbyname
  departmentlistcopy:any[]=[];
  // Boolean for add button
  Addable = false;
  // Boolean for Edit Department
  Editable = false;
  // Co-ordinator to manage Department
  roleid: number = this.auth.getRoleId();

  //Component initialization
  ngOnInit(): void {
    this.roleid = this.auth.getRoleId();
    if (this.roleid == 1) {

    } else if (this.roleid == 2) {
      this.Addable = true;
      this.Editable =true;
    }
    this.GetallDepartment()
  }
  // Get List of All Department
  GetallDepartment() {
    this.dservice.getAllDepartment().subscribe(res => {
      this.departmentlist = res
      this.departmentlistcopy = res
    })
  }
  // Update pagination setting 
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.departmentlist.length;
  }
  // Filters list of Department by Search entered  
  filterByName(search: HTMLInputElement) {
    if (search.value != '') {
      this.departmentlist = this.departmentlistcopy.filter((user: any) => this.getFilteredDepartment(user,search))
    }else{
      this.departmentlist = this.departmentlistcopy
    }
    this.updateCurrentPageAndTotalLength();
  }
  private getFilteredDepartment(department: any, search: HTMLInputElement): any {
    return department.name.toLowerCase().includes(search.value.toLowerCase());
  }
}