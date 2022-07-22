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

  constructor(private CourseService: CourseService, private route: Router, public auth: LoginService, private http: HttpClient) { }


  _course = '';
  //variable to store and iterate through list of courses
  _dept = '';
  //variable to store and iterate through list of departments
  dept: any
  courselist: any;
  course: any[] = [];
  courselistcopy: any[] = [];
  // Paginate settings
  page: number = 1;
  totalLength: any;
  search !: string;
  // 

  private CoordinatorId: number = 2;     // Coordinator role id
  private TrainerId: number = 3;        // Trainer role id
  private TraineeId: number = 4;       // Trainee role id

  //Enables the add button in course list for coordinator
  add: boolean = false;

  //This method activates the methods when Courseist component created 
  ngOnInit(): void {
    if (this.auth.getRoleId() == this.CoordinatorId) {
      this.getAllCourses();
      this.add = true;
    }
    else if (this.auth.getRoleId() == this.TrainerId) {
      this.getCoursebyToken(this.auth.getId())
    }
    else if (this.auth.getRoleId() == this.TraineeId) {
      this.getCoursebyToken(this.auth.getId())
    }
    this.GetallDepartment();
  }
  getAllCourses() {
    this.CourseService.getAllCourses().subscribe(res => {
      this.courselist = res
      this.courselistcopy = res
      console.log(this.courselistcopy)
    })
  }
  myfunction(id: number) {
    let text = "Are You Sure You Want To Disable The Course";
    if (confirm(text) == true) {
      this.disableCourse(id)
    } else {
      text = "You canceled!";
    }
  }
  //returns list of courses assigned to the particular user
  getCoursebyToken(id: number) {
    console.warn(id)
    this.CourseService.getCourseByCourseForTraineeTrainer().subscribe(res => {
      this.courselist = res;
      this.courselistcopy = res
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
  ToCourseView(id: number) {
    this.route.navigate(['CourseList/Course/' + id]);
  }
  // ToEditCourse(obj : any){
  //   var course : any;
  //   course = obj;
  //   this.route.navigate(['/EditCourse/'+course], { state: { course :course }})
  // }

  GetallDepartment() {
    this.http.get("https://localhost:5001/Department/departments").subscribe(res => {
      this.dept = res;
    })
  }

  filterByDepartment(item: HTMLSelectElement,) {
    if (item.value != '') {
      this.courselist = this.courselistcopy.filter(u => u.departmentId == item.value)
      this.updateCurrentPageAndTotalLength();
    } else {
      this.courselist = this.courselistcopy
      this.updateCurrentPageAndTotalLength();
    }
  }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.courselist.length;
  }
  // filterByName(search: HTMLInputElement) {
  //   const dropdown = document.getElementById("hello")! as HTMLSelectElement 
  //   console.log(dropdown)
  //   if(dropdown != null)dropdown.value = ""
  //   if (search.value != '') {
  //     console.log(this.courselist)
  //     this.courselist = this.courselistcopy.filter((course: any) => course.name.toLowerCase().includes(search.value.toLowerCase()))
  //     this.updateCurrentPageAndTotalLength();
  //   } else {
  //     this.courselist = this.courselistcopy
  //     this.updateCurrentPageAndTotalLength();
  //     dropdown.disabled = false
  //   }
  // }
  filterByName(search: HTMLInputElement) {
    const dropdown = document.getElementById("departmentId")! as HTMLSelectElement
    if (this.auth.IsCoordinator) {
      if (search.value != '') {
        this.courselist = this.courselistcopy.filter((course: any) => course.name.toLowerCase().includes(search.value.toLowerCase()))
        this.updateCurrentPageAndTotalLength();
      } else if (search.value != null && dropdown.value != '') {
        if (dropdown != null) this.courselistcopy = this.courselistcopy.filter((course: any) => course.departmentId == dropdown.value)
        this.updateCurrentPageAndTotalLength();
      } else {
        this.courselist = this.courselistcopy
      }
    }
    else (this.auth.IsloggedIn)
    {
      if (search.value != '') {
        this.courselist = this.courselistcopy.filter((course: any) => course.name.toLowerCase().includes(search.value.toLowerCase()))
        this.updateCurrentPageAndTotalLength();
      } else if (search.value != null) {
        if (dropdown != null) this.courselistcopy = this.courselistcopy.filter((course: any) => course.departmentId == dropdown.value)
        this.updateCurrentPageAndTotalLength();
      } else {
        this.courselist = this.courselistcopy
      }
    }
  }
}

