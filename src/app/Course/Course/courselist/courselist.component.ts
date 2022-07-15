import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DepartmentService } from 'src/app/Department/department.service';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  constructor(private CourseService:CourseService, private route: Router, public auth : LoginService, private http : HttpClient) { }
  _course = '';
  //variable to store and iterate through list of courses
  courselist : any;
  _dept = '';
  //variable to store and iterate through list of departments
  dept: any

  // Paginate settings
  page: number = 1;
  totalLength: any;
  search !: string;
  // 

  private CoordinatorId : number = 2;     // Coordinator role id
  private TrainerId : number = 3;        // Trainer role id
  private TraineeId : number = 4;       // Trainee role id
  
  //Enables the add button in course list for coordinator
  add: boolean = false;

  //This method activates the methods when Courseist component created 
  ngOnInit(): void  {
    if (this.auth.getRoleId() == this.CoordinatorId) {
      this.getAllCourses();
      this.add = true;
    }
    else if (this.auth.getRoleId() == this.TrainerId) {
      this.getCoursesByUserId(this.auth.getId())
    }
    else if(this.auth.getRoleId() == this.TraineeId){
      this.getCoursesByUserId(this.auth.getId())
    }
    this.GetallDepartment();
  }
  getAllCourses() {
    this.CourseService.getAllCourses().
      subscribe(res => {
        this.courselist = res
      })
  }
  //returns list of courses assigned to the particular user
  getCoursesByUserId(id: number) {
    console.warn(id)
    this.CourseService.getCoursesByUserId(id).subscribe(res => {
      this.courselist = res;
    })
  }

  disableCourse(id: number) {
    this.CourseService.disableCourse(id).subscribe(() => this.getAllCourses())
    // this.showToast();
  // }
  // showToast() {
  //   this.toastService.error('Disabled')
  }
  SearchActive(search: string) {
    this.search = search;
  }
  ToCourseView(id : number){
    var course : any;
    this.http.get("https://localhost:5001/Course/"+ id).subscribe(res => {
      course = res;
      this.route.navigate(['/CourseView'], { state: { courseView : course } });
    });
  }
  ToEditCourse(obj : any){
    var course : any;
    course = obj;
    this.route.navigate(['/EditCourse'], { state: { course :course }})
  }
  
  GetallDepartment() {
    this.http.get("https://localhost:5001/Department/departments").subscribe(res =>{
      this.dept = res;
    })
  }

}

