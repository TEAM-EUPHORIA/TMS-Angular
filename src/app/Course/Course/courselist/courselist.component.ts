import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css'],
})
export class CourselistComponent implements OnInit {
  constructor(
    private CourseService: CourseService,
    private route: Router,
    public auth: LoginService,
    private http: HttpClient,
    private toastService: HotToastService
  ) {}

  //to store and iterate through list of departments
  dept: any;
  //variable to bind ngModule data
  _dept: any;
  //to store and iterate through list of courses
  courselist: any = [];
  // Copy of the course list
  courselistcopy: any[] = [];

  //Pagination settings
  page: number = 1;
  totalLength: any;
  search!: string;
  //

  private CoordinatorId: number = 2; // Coordinator Role id
  private TrainerId: number = 3; // Trainer Role id
  private TraineeId: number = 4; // Trainee Role id

  //Component initialization
  ngOnInit(): void {
    if (this.auth.getRoleId() == this.CoordinatorId) {
      this.GetAllCourses();
    } else if (this.auth.getRoleId() == this.TrainerId) {
      this.GetCoursebyToken(this.auth.getId());
    } else if (this.auth.getRoleId() == this.TraineeId) {
      this.GetCoursebyToken(this.auth.getId());
    }
    this.GetAllDepartment();
  }

  //Display dialog for Disable conformation
  myfunction(id: number) {
    if (id != 0 || id != null) {
      let text = 'Are You Sure You Want To Disable The Course';
      if (confirm(text) == true) {
        this.DisableCourse(id);
      } else {
        text = 'You canceled!';
      }
    }
  }

  //Gets list of All Courses
  GetAllCourses() {
    this.CourseService.getAllCourses().subscribe((res) => {
      this.courselist = res;
      this.courselistcopy = res;
    });
  }

  //returns list of courses assigned to the particular user
  GetCoursebyToken(id: number) {
    this.CourseService.getCourseByCourseForTraineeTrainer().subscribe((res) => {
      this.courselist = res;
      this.courselistcopy = res;
    });
  }

  // Function to disable Course
  DisableCourse(id: number) {
    if (id != null) {
      this.CourseService.disableCourse(id).subscribe(() =>
        this.GetAllCourses()
      );
      this.toastService.error('Disabled');
    }
  }

  // Navigate to Individual Course
  ToCourseView(id: number) {
    if (id != 0 || id != null) this.route.navigate(['CourseList/Course/' + id]);
  }

  //Gets All Department from server
  GetAllDepartment() {
    this.http
      .get('https://localhost:5001/Department/departments')
      .subscribe((res) => {
        this.dept = res;
      });
  }

  // Filters list of Courses by Depatment selected
  filterByDepartment() {
    const item = document.getElementById('departmentId') as HTMLSelectElement;
    if (item.value != '') {
      this.courselist = this.courselistcopy.filter(
        (u) => u.departmentId == item.value
      );
    } else {
      this.courselist = this.courselistcopy;
    }
    this.updateCurrentPageAndTotalLength();
  }

  // Filters list of Courses by Search entered
  FilterByName() {
    const search = document.getElementById('search') as HTMLInputElement;
    const item = document.getElementById('departmentId') as HTMLSelectElement;
    if (item != null) {
      if (search.value != '' && item.value != '') {
        this.courselist = this.courselistcopy.filter(
          (course: any) =>
            course.name.toLowerCase().includes(search.value.toLowerCase()) &&
            course.departmentId == item.value
        );
      } else if (search.value != '' && item.value == '') {
        this.courselist = this.courselistcopy.filter((course: any) =>
          this.getFilteredCourse(course, search)
        );
      } else if (search.value == '' && item.value != '') {
        this.courselist = this.courselistcopy.filter(
          (course: any) => course.departmentId == item.value
        );
      } else if (search.value == '' && item.value == '') {
        this.courselist = this.courselistcopy;
      }
    } else {
      if (search.value != '') {
        this.courselist = this.courselistcopy.filter((course: any) =>
          this.getFilteredCourse(course, search)
        );
      } else {
        this.courselist = this.courselistcopy;
      }
    }
    this.updateCurrentPageAndTotalLength();
  }

  // Update pagination setting
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.courselist.length;
  }

  //Returns list of course filtered by search
  private getFilteredCourse(course: any, search: HTMLInputElement): any {
    return course.name.toLowerCase().includes(search.value.toLowerCase());
  }
}
