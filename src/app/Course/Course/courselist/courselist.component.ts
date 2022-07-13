import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/Department/department.service';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  constructor(private CourseService:CourseService, private route: Router, private dservice : DepartmentService , public auth : LoginService) { }
  _course = '';
  course: any;
  _dept = '';
  dept: any
  page: number = 1;
  totalLength: any;
  searchuser !: string;
  roleId !: number;
  Trainer: boolean = false;
  IsCoordinator: boolean = false;
  IsTrainer: boolean = false;
  IsTrainee: boolean = true;

  add: boolean = false;

  ngOnInit(): void  {
    this.GetallDepartment();
    if (this.auth.getRoleId() == 2) {
      this.IsCoordinator=true;
      this.getAllCourses();
      this.add = true;
    }
    else if (this.auth.getRoleId() == 3) {
      this.getCoursesByUserId(this.auth.getId())
      this.IsTrainer = true;
    } else {

      this.getCoursesByUserId(this.auth.getId())
    }
    
  }
  getAllCourses() {
    this.CourseService.getAllCourses().
      subscribe(res => {
        this.course = res
      })
  }

  getCoursesByUserId(id: number) {
    console.warn(id)
    this.CourseService.getCoursesByUserId(id).subscribe(res => {
      this.course = res;
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
    this.searchuser = search;
  }
  GetallDepartment() {
    this.dservice.getAllDepartment().subscribe(res => {
      this.dept = res
    })
  }

}

