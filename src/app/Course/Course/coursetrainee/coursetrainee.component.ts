import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { baseurl } from 'src/app/URL';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-coursetrainee',
  templateUrl: './coursetrainee.component.html',
  styleUrls: ['./coursetrainee.component.css']
})
export class CoursetraineeComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, public auth: LoginService, private courseService: CourseService) { }

  addTrainees: { courseId: number, users: [{ userId: number, roleId: number }] } = { courseId: 0, users: [{ userId: 0, roleId: 0 }] }
  removeTrainees: { courseId: number, users: [{ userId: number, roleId: number }] } = { courseId: 0, users: [{ userId: 0, roleId: 0 }] }
  trainees: any[] | any
  newTrainees: any[] | any
  data: any;
  course: any;
  searchText: string = "";
  courseId: number = 0;
  Givefeedback: boolean = false;
  deptId!: number;
  List: boolean = false;
  toDisplay: boolean = false;
  page: number = 1;
  totalLength: any;
  coursetraineelist: any[] = [];
  coursetraineelistcopy: any[] = [];
  Feedbacks: any

  traineeId = 3;
  toggleData() {
    this.toDisplay = !this.toDisplay;
    //this.AddTrainee();
    var model = document.getElementById("exampleModal")
    model?.classList.toggle('show')
    console.warn(model)
  }

  Save() {
    this.addTrainees.courseId = this.courseId
    this.removeTrainees.courseId = this.courseId
    this.addTrainees.users.shift()
    this.removeTrainees.users.shift()
    if (this.addTrainees.users.length > 0)
      console.warn(this.addTrainees, "", this.removeTrainees)
    {
      this.http.put("https://localhost:5001/" + `Course/assignUsers`, this.addTrainees).subscribe(res => {
        console.warn(res);
      })
    }
    if (this.removeTrainees.users.length > 0) {
      this.http.put("https://localhost:5001/" + `Course/removeUsers`, this.removeTrainees).subscribe(res => {
        console.warn(res);
      })
    }
    window.location.reload();
  }
  scrollbar() {
    overflow: scroll;
  }
  AddTrainee(option: any) {
    this.filterNewTrainees();
    this.searchText = ""
    var user = { userId: option.id, roleId: option.roleId }
    // this.trainees.push(option)
    this.addTrainees.users.push(user)
    this.filterNewTrainees();
  }
  private filterNewTrainees() {
    this.newTrainees = this.newTrainees.filter((ar: any) => !this.trainees.find((rm: any) => (rm.id === ar.id)));
  }
  removeUser(option: any): any {
    // this.filterTrainees();
    var user = { userId: option.id, roleId: option.roleId }
    //this.newTrainees.push(option)
    this.removeTrainees.users.push(user)
    this.filterTrainees();
  }
  private filterTrainees() {
    this.trainees = this.trainees.filter((ar: any) => !this.newTrainees.find((rm: any) => (rm.id === ar.id)));
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.deptId = this.route.snapshot.params['deptId'];
    this.courseService.getCourse(this.courseId).subscribe((res: any) => {
      this.course = res;
      localStorage.setItem('courseName',res.name)
      this.course.name = localStorage.getItem('courseName')
      this.Givefeedback = (this.course.feedbacks[0] == null)
      console.warn(this.course);
    });
    var route = `Course/getCourseUser/${this.courseId}`
    this.http.get("https://localhost:5001/" + route).subscribe(res => {
      this.trainees = res;
      console.warn(this.trainees)
    })
    route = `User/GetUsersByDepartmentAndRole/${this.deptId},4`
    this.http.get("https://localhost:5001/" + route).subscribe(res => {
      this.newTrainees = res
      console.warn(this.newTrainees)
      this.newTrainees = this.newTrainees.filter((ar: any) => !this.trainees.find((rm: any) => (rm.id === ar.id)))
      this.List = (this.newTrainees.length > 0);
    })
  }
  toviewtraineelist() {
    var obje = {
      courseId: this.courseId,
      roleId: this.traineeId
    };
    console.log(obje);
    // this.router.navigate(['/ViewTraineeList'], {state : {vid : obje}});
  }

  GiveTraineeFeedback(traineeId: number, traineeName: string) {
    this.router.navigate([`Course/${this.courseId}/CourseTrainee/${traineeId}/Add`], { state: { TraineeName: traineeName } });
  }
  ViewTraineeFeedback(traineeId: number, traineeName: string) {
    this.router.navigate([`Course/${this.courseId}/CourseTrainee/${traineeId}`], { state: { TraineeName: traineeName } });
  }

  /////                           NEEDS TO BE IMPLEMENTED WELL
  // GetAllFeedbacks(){
  //   this.http.get("https://localhost:5001/FeedBack/trainee/"+this.id).subscribe({
  //     next : (res) => {
  //       this.Feedbacks = res;
  //       console.warn(this.Feedbacks);
  //     }
  //   })
  // }

  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.coursetraineelist.length;
  }
  filterByName(search: HTMLInputElement) {
    if (search.value != '') {
      console.log(this.coursetraineelist)
      this.coursetraineelist = this.coursetraineelistcopy.filter((department: any) => department.name.toLowerCase().includes(search.value.toLowerCase()))
      this.updateCurrentPageAndTotalLength();
    } else {
      this.coursetraineelist = this.coursetraineelistcopy
      this.updateCurrentPageAndTotalLength();
    }
  }
  ToFeedback() {
    this.router.navigate(['/ViewTraineeFeedback/' + this.courseId, this.traineeId]);
  }
  ToAddFeedback() {
    var cId: any;
    cId = this.courseId;
    this.router.navigate(['/GiveTraineeFeedback/' + this.courseId]);
  }
  getTraineeFeedbackById() {
    this.http.get("https://localhost:5001/FeedBack/trainee/" + `${this.courseId},+${this.traineeId},+${this.auth.getId()}`).subscribe(res => {
      this.data = res
      console.warn(this.data);
    })
  }
}


