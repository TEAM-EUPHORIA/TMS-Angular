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
  // Department Id for Edit Department
  id!: number;
  //Set Title for the Add/Edit in the page
  Title!: string;
  //Set Button Name for the Add/Edit in the page
  title! : string;

  //Creates formGroup and formControl for Department Name
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

  //Component initialization
  ngOnInit(): void {
    this.id = this.route.snapshot.params['deptId']
    if (this.id == null) {
      this.Title = "Add";
      this.title = "Add"
    } else {
      this.Title = "Edit";
      this.title = "Save"
      this.GetDepartmentById();
    }

  }
  
  // Get Department by Id for Edit
  GetDepartmentById() {
    this.departmentservice.GetDepartmentById(this.id).subscribe(res => {
      this.department = res;
    })
  }
  
  // Button Clicked
  OnSubmit() {
    if (this.department.id != undefined) {
      this.departmentservice.putdepartment(this.department).subscribe({
        next: (res: any) => {
          window.location.replace("Department")
          this.toastService.success("Department was updated successfully.")
        },
        error: (err: any) => {
          this.serverSideErrorMsgs(err);
        }
      })
    } else {
      this.departmentservice.postdepartment(this.department).subscribe({
        next: (res: any) => {
          window.location.replace("Department")
          this.toastService.success("Department was created successfully.")
        },
        error: (err: any) => {
          this.serverSideErrorMsgs(err);
        }
      })
    }
  }

  //Handles multiple error message from server
  private serverSideErrorMsgs(err: any) {
    const errors = err["error"];
    Object.keys(errors).forEach(prop => {
      const formControl = this.deptform.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors[prop]
        });
      }
    });
  }
}
