import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../course.service';
import { LoginService } from 'src/app/Login/login.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-coursecrud',
  templateUrl: './coursecrud.component.html',
  styleUrls: ['./coursecrud.component.css'],
})
export class CoursecrudComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private router: ActivatedRoute,
    private http: HttpClient,
    private auth: LoginService,
    private toastService: HotToastService
  ) {}

  //Course id for the Edit
  courseId!: number;
  //Set Title for the Add/Edit in the page
  Title: string = 'Add';
  //Boolean variable to check Add/Edit Department
  Editable: boolean = false;
  //Temparary data storing form server
  data: any;
  //Store Department list from server
  dept: any;
  //
  course!: any;
  //Model for Course
  Course: any = {
    id: 0,
    statusId: 1,
    trainerId: '',
    departmentId: null,
    description: '',
    name: '',
    duration: '',
  };

  //Creates formGroup and formControl for Course and its property
  courseform = new FormGroup({
    name: new FormControl([
      '',
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(3),
    ]),
    description: new FormControl([
      '',
      Validators.required,
      Validators.maxLength(200),
      Validators.minLength(25),
    ]),
    duration: new FormControl([
      '',
      Validators.required,
      Validators.pattern(
        '^([01]?[0-9]|2[0-3])s(([h][r][s])|([h][r]))s[0-9][0-9]s(([m][i][n][s])|([m][i][n]))$'
      ),
      Validators.maxLength(15),
      Validators.minLength(4),
    ]),
    department: new FormControl(['', Validators.required]),
    trainer: new FormControl(['', Validators.required]),
  });

  //Component initialization
  ngOnInit(): void {
    this.GetAllDepartment();
    this.courseId = this.router.snapshot.params['courseId'];
    if (this.auth.IsCoordinator) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (res: any) => {
          this.Course = res;
          this.GetUsersByRole();
        },
        error: (err: any) => {
          console.warn(err);
          console.log('hi');
        },
      });
      if (this.courseId != undefined) {
        console.warn(this.Course);
        this.Title = 'Update';
        this.Editable = true;
      }
    }
  }

  // Button clicked
  OnSubmit() {
    if (this.courseId != undefined || this.courseId != null) {
      this.courseService.putcourse(this.Course).subscribe({
        next: (res: any) => {
          this.toastService.success('Course was updated successfully.');
          console.warn(this.course);
          window.location.replace('/Courses');
        },
        error: (err: any) => {
          this.ServerSideErrorMsgs(err);
        },
      });
    } else {
      this.courseService.postcourse(this.Course).subscribe({
        next: (res: any) => {
          this.toastService.success('Course was created successfully.');
          window.location.replace('/Courses');
        },
        error: (err: any) => {
          this.ServerSideErrorMsgs(err);
        },
      });
    }
  }

  //Handles multiple error message from server
  private ServerSideErrorMsgs(err: any) {
    console.warn(err['error']);
    const errors = err['error'];
    Object.keys(errors).forEach((prop) => {
      const formControl = this.courseform.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors[prop],
        });
        console.warn(this.courseform.controls['name'].getError('serverError'));
      }
    });
  }

  //Update Department
  Update(department: any) {
    if (department != null) {
      this.Course.departmentId = department.value;
      this.GetUsersByRole();
    }
  }

  //Gets list of Trainer in the Department
  GetUsersByRole() {
    this.http
      .get(
        'https://localhost:5001/User/GetUsersByDepartmentAndRole/' +
          `${this.Course.departmentId},${3}`
      )
      .subscribe((res) => {
        this.data = res;
        console.log(res);
      });
  }

  //Gets all department for filter by Department
  GetAllDepartment() {
    this.http
      .get('https://localhost:5001/Department/departments')
      .subscribe((res) => {
        this.dept = res;
        console.log(this.dept);
      });
  }
}

