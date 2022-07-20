import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../course.service';
import { LoginService } from 'src/app/Login/login.service';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-coursecrud',
  templateUrl: './coursecrud.component.html',
  styleUrls: ['./coursecrud.component.css']
})
export class CoursecrudComponent implements OnInit {

  Traineeid !: number;


  constructor(private route: Router, private cs: CourseService,
    private routing: Router, private router: ActivatedRoute, private http: HttpClient,
    private auth: LoginService,private toastService: HotToastService) { this.course = this.route.getCurrentNavigation()?.extras.state?.['course'] }

  data: any;
  dept: any;
  Title: string = "Add";
  course!: any;
  courseId!: number;
  Editable: boolean = false;
  TrainerId = '';
  Course: any = {
    id: 0,
    statusId: 1,
    trainerId: '',
    departmentId: null,
    description: '',
    name: '',
    duration: '',
  }

  courseform = new FormGroup({
    coursename: new FormControl(['',
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(3),
    ]),
    description: new FormControl(['',
      Validators.required,
      Validators.maxLength(200),
      Validators.minLength(25)
    ]),
    duration: new FormControl(['',
      Validators.required,
      Validators.pattern("^([01]?[0-9]|2[0-3])\s(([h][r][s])|([h][r]))\s[0-9][0-9]\s(([m][i][n][s])|([m][i][n]))$"),
      Validators.maxLength(15),
      Validators.minLength(4)
    ]),
    department: new FormControl(['',
      Validators.required,
    ]),
    trainer: new FormControl(['',
      Validators.required,
    ]),
  })

  ngOnInit(): void {
    this.getAllDepartment();
    this.getUserByRole();
    // console.warn(this.course.id);
    this.courseId = this.router.snapshot.params["courseId"]
    this.cs.getCourseByCourseId().subscribe({
      next: (res: any) => {
        this.Course = res;
        console.log(res);
      },
      error: (err: any) => {
        console.warn(err)
      }
    })
    if (this.courseId != undefined) {
      console.warn(this.Course);
      this.Title = "Update"
      // this.Editable = true;
    }

  }
  OnSubmit() {
    console.warn(this.course);
    if (this.courseId != undefined || this.courseId != null) {
      // this.course.trainerId = this.TrainerId;
      this.cs.putcourse(this.Course).subscribe((res) => {
      })
    }
    else {
      this.cs.postcourse(this.Course).subscribe({
        next: (res: any) => {
          window.location.replace("/CourseList")
          this.toastService.success("The User was created successfully.")
        },
        error: (err: any) => {
          this.serverSideErrorMsgs(err);
        }
      })
    }
    // window.location.replace("/CourseList");
  }
  private serverSideErrorMsgs(err: any) {
    console.warn(err["error"]);
    const errors = err["error"];
    Object.keys(errors).forEach(prop => {
      const formControl = this.courseform.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors[prop]
        });
        console.warn(this.courseform.controls['coursename'].getError('serverError'));
      }
    });
  }

  getUserByRole() {
    this.http.get("https://localhost:5001/User/role/" + `${3}`).subscribe((res) => {
      this.data = res
      console.log(res)
    });
  }
  getAllDepartment() {
    this.http.get("https://localhost:5001/Department/departments").subscribe(res => {
      this.dept = res
      console.log(this.dept)
    })
  }
  getCourseById() {
    this.http.get("https://localhost:5001/Course/").subscribe(res => {
      this.Course = res;
    })
  }
}