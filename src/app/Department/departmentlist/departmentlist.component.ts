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
  department:any;
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
      this.data = res
      this.departmentlist=res;
      this.departmentlistcopy=res;
      console.log(this.data)
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
  filterByDepartment(item: HTMLSelectElement,) {
    console.log(item)
    if (item.value != '') {
      this.departmentlist = this.departmentlistcopy.filter(u => u.departmentId == item.value)
      this.updateCurrentPageAndTotalLength();
    } else {
      this.departmentlist = this.departmentlistcopy
      this.updateCurrentPageAndTotalLength();
    }
   }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.departmentlist.length;
  }
  filterByName(search: HTMLInputElement) {
    const dropdown = document.getElementById("departmentId")! as HTMLSelectElement 
    dropdown.value = ""
    if (search.value != '') {
      console.log(this.departmentlist)
      this.departmentlist = this.departmentlistcopy.filter((department: any) => department.Name.toLowerCase().includes(search.value.toLowerCase()))
      this.updateCurrentPageAndTotalLength();
    } else {
      this.departmentlist = this.departmentlistcopy
      this.updateCurrentPageAndTotalLength();
      dropdown.disabled = false
    }
  }
}