import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '../../course.service';
import { LoginService } from 'src/app/Login/login.service';


@Component({
  selector: 'app-coursecrud',
  templateUrl: './coursecrud.component.html',
  styleUrls: ['./coursecrud.component.css']
})
export class CoursecrudComponent implements OnInit {

 Traineeid !: number;

  
  constructor( private route: Router, private cs: CourseService,
    private routing: Router, private router: ActivatedRoute, private http : HttpClient,
    private auth: LoginService ) { this.course = this.route.getCurrentNavigation()?.extras.state?.['course'] }
  
  data: any;
  dept: any;
  Title!: string;
  course! : any;
  courseId! : number;
  Editable : boolean = false;
  
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
    console.warn(this.course.id);
    if(this.course != undefined || this.course != null){
      this.Title = "Edit"
      this.Editable = true;
    }else{
      this.Title = "Add";
    }
    this.courseId = this.course.id;
    console.log(this.courseId);
  
  }
  OnSubmit() {
    if (this.course != undefined || this.course == null) {
      this.cs.putcourse(this.Course).subscribe((res) => {
      })
    }
    else {
      this.cs.postcourse(this.Course).subscribe((res) => {
      })
    }
    this.routing.navigateByUrl("/CourseList");
  }

  getUserByRole() {
    this.http.get("https://localhost:5001/User/role/"+`${3}`).subscribe((res) => {
      this.data = res
    });
  }
  getAllDepartment() {
    this.http.get("https://localhost:5001/Department/departments").subscribe(res => {
      this.dept = res
      console.log(this.dept)
    })
  }
  getCourseById(){
    this.http.get("https://localhost:5001/Course/").subscribe(res => {
      this.Course = res;
    })
  }
}