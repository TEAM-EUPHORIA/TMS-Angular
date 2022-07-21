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
    name: new FormControl('', [
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
    console.log(this.department)
    if (this.department.id != undefined) {
      console.warn(this.department)
      console.warn("edit")
      this.departmentservice.putdepartment(this.department).subscribe({
        next: (res: any) => {
          window.location.replace("DepartmentList")
          this.toastService.success("Department was updated successfully.")
        },
        error: (err: any) => {
          this.serverSideErrorMsgs(err);
        }
      })
    } else {
      console.warn(this.department)
      console.warn("add")
      this.departmentservice.postdepartment(this.department).subscribe({
        next: (res: any) => {
          window.location.replace("DepartmentList")
          this.toastService.success("Department was created successfully.")
        },
        error: (err: any) => {
          this.serverSideErrorMsgs(err);
        }
      })
    }
  }
  showToast() {
    this.toastService.success('Login Successfully')
  }
  private serverSideErrorMsgs(err: any) {
    console.warn(err["error"]);
    const errors = err["error"];
    Object.keys(errors).forEach(prop => {
      console.log(this.deptform.get(prop))
      const formControl = this.deptform.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors[prop]
        });
        console.warn(this.deptform.controls['name'].getError('serverError'));
      }
    });
  }
  // showToast_Add() {
  //   this.toastService.success("Department was created successfully.")
  // }
  // showToast_Edit() {
  //   this.toastService.success("Department was updated successfully.")
  // }
}