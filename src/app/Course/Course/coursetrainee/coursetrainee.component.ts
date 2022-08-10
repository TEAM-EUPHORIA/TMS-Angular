import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { baseurl } from 'src/app/URL';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-coursetrainee',
  templateUrl: './coursetrainee.component.html',
  styleUrls: ['./coursetrainee.component.css'],
})
export class CoursetraineeComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public auth: LoginService,
    private courseService: CourseService
  ) {}

  addTrainees: {
    courseId: number;
    users: [{ userId: number; roleId: number }];
  } = { courseId: 0, users: [{ userId: 0, roleId: 0 }] };
  removeTrainees: {
    courseId: number;
    users: [{ userId: number; roleId: number }];
  } = { courseId: 0, users: [{ userId: 0, roleId: 0 }] };

  //to store and iterate through list of courses
  trainees: any[] | any;
  // Copy of the course list
  newTrainees: any[] | any;

  //to store and iterate through list of courses
  coursetraineelist: any[] = [];
  // Copy of the course list
  coursetraineelistcopy: any[] = [];

  // Temparary data storing
  data: any;
  //Store Course details
  course: any;
  //Search text for serch field
  searchText: string = '';

  //Course Id of the Course where trainees to be added
  courseId: number = 0;

  // Boolean to check give/view feedback of Trainees
  Givefeedback: boolean = false;

  //Department Id for the filter list of Trainees
  deptId!: number;

  //List to the store where trainees to be added
  List: boolean = false;

  //Boolean to show/hide the list of trainees not assigned to the course
  toDisplay: boolean = false;

  //Pagination settings
  page: number = 1;
  totalLength: any;

  traineeId = 3;

  //toggle between add and remove trainees from course
  toggleData() {
    this.toDisplay = !this.toDisplay;
    var model = document.getElementById('exampleModal');
    model?.classList.toggle('show');
  }

  Save() {
    this.addTrainees.courseId = this.courseId;
    this.removeTrainees.courseId = this.courseId;
    this.addTrainees.users.shift();
    this.removeTrainees.users.shift();
    if (this.addTrainees.users.length > 0) {
      this.http
        .put(baseurl + `Course/assignUsers`, this.addTrainees)
        .subscribe((res) => {});
    }
    if (this.removeTrainees.users.length > 0) {
      this.http
        .put(baseurl + `Course/removeUsers`, this.removeTrainees)
        .subscribe((res) => {});
    }
    window.location.reload();
  }

  AddTrainee(option: any) {
    this.filterNewTrainees();
    this.searchText = '';
    var user = { userId: option.id, roleId: option.roleId };
    this.addTrainees.users.push(user);
    this.filterNewTrainees();
  }

  //Gets list of trainees not assigned to the course
  private filterNewTrainees() {
    this.newTrainees = this.newTrainees.filter(
      (ar: any) => !this.trainees.find((rm: any) => rm.id === ar.id)
    );
  }

  //Removes selected trainees form the course
  removeUser(option: any): any {
    var user = { userId: option.id, roleId: option.roleId };
    this.removeTrainees.users.push(user);
    this.filterTrainees();
  }

  //Gets list of trainees after removing existing trainees
  private filterTrainees() {
    this.trainees = this.trainees.filter(
      (ar: any) => !this.newTrainees.find((rm: any) => rm.id === ar.id)
    );
  }

  //Component initialization
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.deptId = this.route.snapshot.params['deptId'];
    if (this.courseId != 0 && this.deptId != 0) {
      this.CourseTraineeInit();
    } else {
      window.location.replace('/PageNotFound');
    }
  }

  //CourseTrainee Initialization
  CourseTraineeInit() {
    this.courseService.getCourse(this.courseId).subscribe((res: any) => {
      this.course = res;
      localStorage.setItem('courseName', res.name);
      this.course.name = localStorage.getItem('courseName');
      this.Givefeedback = this.course.feedbacks[0] == null;
    });
    var route = `Course/getCourseUser/${this.courseId}`;
    this.http.get(baseurl + route).subscribe((res) => {
      this.trainees = res;
    });
    route = `User/GetUsersByDepartmentAndRole/${this.deptId},4`;
    this.http.get(baseurl + route).subscribe((res) => {
      this.newTrainees = res;
      this.newTrainees = this.newTrainees.filter(
        (ar: any) => !this.trainees.find((rm: any) => rm.id === ar.id)
      );
      this.List = this.newTrainees.length > 0;
    });
  }

  GiveTraineeFeedback(traineeId: number, traineeName: string) {
    if (traineeId !== 0 && this.courseId != 0 && traineeName !== null)
      this.router.navigate(
        [`Course/${this.courseId}/CourseTrainee/${traineeId}/Add`],
        { state: { TraineeName: traineeName } }
      );
  }
  ViewTraineeFeedback(traineeId: number, traineeName: string) {
    if (traineeId !== 0 && this.courseId != 0 && traineeName !== null)
      this.router.navigate(
        [`Course/${this.courseId}/CourseTrainee/${traineeId}`],
        { state: { TraineeName: traineeName } }
      );
  }

  // Update pagination setting
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.coursetraineelist.length;
  }
  //Filter Trainee list by search text
  filterByName(search: HTMLInputElement) {
    if (search.value != '') {
      this.coursetraineelist = this.coursetraineelistcopy.filter(
        (department: any) =>
          department.name.toLowerCase().includes(search.value.toLowerCase())
      );
      this.updateCurrentPageAndTotalLength();
    } else {
      this.coursetraineelist = this.coursetraineelistcopy;
      this.updateCurrentPageAndTotalLength();
    }
  }
}
