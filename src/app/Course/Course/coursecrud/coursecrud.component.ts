import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursecrudService } from './coursecrud.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-coursecrud',
  templateUrl: './coursecrud.component.html',
  styleUrls: ['./coursecrud.component.css']
})
export class CoursecrudComponent implements OnInit {

 Traineeid!: number;
  
  constructor( private route: Router, private cs: CoursecrudService,
    private routing: Router, private router: ActivatedRoute, private http : HttpClient,
    // private auth: LoginService
     ) { }
  data: any;
  dept: any;
  Title!: string;
  courseId! : number;

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
    this.courseId = this.router.snapshot.params['courseId'];
    if (this.courseId == null) {
      this.Title = "Add";
    } else {
      console.warn(this.courseId);
      this.Title = "Edit"
      
    }
  }
  OnSubmit() {
    if (this.Course.id != 0) {
      this.cs.putcourse(this.Course).subscribe((res) => {

      })
    }
    else {
      this.cs.postcourse(this.Course).subscribe((res) => {
      })
    }
    this.routing.navigateByUrl("/CourseList");
  }

  getUserByRole(id : number) {
    this.http.get("https://localhost:5001/User/"+`${id}`).subscribe((res) => {
      this.data = res
    });
  }
  getAllDepartment() {
    this.http.get("https://localhost:5001/Department/").subscribe(res => {
      this.dept = res
    })
  }
}