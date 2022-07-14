import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-departmentcrud',
  templateUrl: './departmentcrud.component.html',
  styleUrls: ['./departmentcrud.component.css']
})
export class DepartmentcrudComponent implements OnInit {

  role = "Co-Ordinator"
  id!: number;
  Title!: string;
  title! : string;


  deptform = new FormGroup({
    dept: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3)
    ])
  });

  constructor(private departmentservice: DepartmentService, private routing: Router, private toastService: HotToastService, private route: ActivatedRoute) { }
  public department: any = {
    name: "",
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['deptId']
    if (this.id == null) {
      this.Title = "Add";
      this.title = "Add"
    } else {
      this.Title = "Edit";
      this.title = "Save"

    }
    console.warn(this.id);
    if (this.id != null || !this.id) {
      this.setoption();
    }
  }

  setoption(form?: NgForm) {
    if (this.id != null) {
      this.GetDepartmentById();
    }
  }

  GetDepartmentById() {
    this.departmentservice.GetDepartmentById(this.id).subscribe(res => {
      this.department = res;
    })
  }

  OnSubmit() {
    if (this.department.id != undefined) {
      this.departmentservice.putdepartment(this.department).subscribe((res: any) => {
        this.department = res
        this.showToast_Edit();
      })
    } else {
      this.departmentservice.postdepartment(this.department).subscribe((res: any) => {
        this.department = res
        this.showToast();
      })
    }
    this.routing.navigateByUrl("/DepartmentList");
  }
  showToast() {
    this.toastService.success('Successfully Added')
  }
  showToast_Edit() {
    this.toastService.success('Successfully Edited')
  }
}