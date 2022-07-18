import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { baseurl } from 'src/app/URL';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-coursetrainee',
  templateUrl: './coursetrainee.component.html',
  styleUrls: ['./coursetrainee.component.css']
})
export class CoursetraineeComponent implements OnInit {

  addTrainees: { courseId: number, users: [{ userId: number, roleId: number }] } = { courseId: 0, users: [{ userId: 0, roleId: 0 }] }
  removeTrainees: { courseId: number, users: [{ userId: number, roleId: number }] } = { courseId: 0, users: [{ userId: 0, roleId: 0 }] }
  trainees: any[] | any
  newTrainees: any[] | any
  constructor(private http: HttpClient,private route: ActivatedRoute,private router : Router, public auth : LoginService) { }
  searchText: string = "";
  id : number = 0;
  List : boolean = false;
  toDisplay : boolean = false;
  page: number = 1;
  totalLength: any;
  
  traineeId = 3;
  toggleData(){
    this.toDisplay = !this.toDisplay;
    //this.AddTrainee();
    var model = document.getElementById("exampleModal")
    model?.classList.toggle('show')
    console.warn(model)
  }
  // to be removed
  toggleNavbar() {
    var sidebar = document.querySelector(".sidebar")
    var nav = document.querySelector(".content")
    sidebar?.classList.toggle('open')
    nav?.classList.toggle('open')
  }
  // 
  Save(){
    this.addTrainees.courseId = this.id
    this.removeTrainees.courseId = this.id
    this.addTrainees.users.shift()
    this.removeTrainees.users.shift()
    if(this.addTrainees.users.length > 0)
    console.warn(this.addTrainees,"",this.removeTrainees)
    {
      this.http.put("https://localhost:5001/" + `Course/assignUsers`,this.addTrainees).subscribe(res => {
        console.warn(res);
      })
    }
    if(this.removeTrainees.users.length > 0)
    {
      this.http.put("https://localhost:5001/" + `Course/removeUsers`,this.removeTrainees).subscribe(res => {
        console.warn(res);
      })
    }
    window.location.reload();
  }
  scrollbar(){
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
    this.newTrainees.push(option)
    this.removeTrainees.users.push(user)
    this.filterTrainees();
  }
  private filterTrainees() {
    this.trainees = this.trainees.filter((ar: any) => !this.newTrainees.find((rm: any) => (rm.id === ar.id)));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['courseId'];
  
  //   console.log(this.id)
  //   this.courseId = this.id;
    var route = `Course/getCourseUser/${this.id}`
    this.http.get("https://localhost:5001/" + route).subscribe(res => {
      this.trainees = res;
      console.warn(this.trainees)
    })
    route = `User/role/4`
    this.http.get("https://localhost:5001/" + route).subscribe(res => {
      this.newTrainees = res
      this.newTrainees = this.newTrainees.filter((ar: any) => !this.trainees.find((rm: any) => (rm.id === ar.id)))
      this.List = (this.newTrainees.length > 0) ;
    })
  }
    toviewtraineelist(){
    var obje = {
     courseId : this.id, 
     roleId : this.traineeId
    };
    console.log(obje);
    // this.router.navigate(['/ViewTraineeList'], {state : {vid : obje}});
    }

    GiveTraineeFeedback(traineeId : number,traineeName : string){
      this.router.navigate(['GiveTraineeFeedback/'+this.id+'/'+traineeId],{state:{TraineeName : traineeName}});
    }
 }
