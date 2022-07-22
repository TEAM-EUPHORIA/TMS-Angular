import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { UserService } from 'src/app/User/user.service';

@Component({
  selector: 'app-givetraineefeedback',
  templateUrl: './givetraineefeedback.component.html',
  styleUrls: ['./givetraineefeedback.component.css']
})
export class GivetraineefeedbackComponent implements OnInit {

  constructor(private route : ActivatedRoute, 
    private http : HttpClient,
    private router : Router,
    private auth : LoginService,
    private userService : UserService) { this.Traineename = this.router.getCurrentNavigation()?.extras.state?.['TraineeName'] }

  traineeId ! : number;
  Traineename = '';
  id !: number;
  trainerId : any;
  courseId : any;
  deptId : any;
  txt = '';
  button = '';

  temp : any;

  TraineeFeedback: any = {
    traineeId: '',
    trainerId: '',
    courseId: '',
    feedback: ''
  }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.params['traineeId'];
    this.courseId = this.route.snapshot.params['courseId'];
    this.trainerId = this.route.snapshot.params['trainerId'];
    this.userService.getUsersById(this.traineeId).subscribe(res => {
      this.temp = res;
      this.deptId = this.temp.departmentId;
    })
    this.setoption();
  }
  setoption() {
    if (this.trainerId != undefined) {
      this.txt = 'Update';
      this.button = 'Update';
      this.http.get<any>('https://localhost:5001/FeedBack/trainee/'+`${this.courseId}`+','+ this.traineeId+','+this.trainerId).subscribe({
        next : (res) => {
          this.TraineeFeedback = res;
        }
      });
    }
    else{
      this.txt = 'Give';
      this.button = 'Submit';
    }
  }
  OnSubmit() {
    if (this.trainerId == undefined) {
      this.TraineeFeedback.courseId = this.courseId;
      this.TraineeFeedback.traineeId = this.traineeId;
      this.TraineeFeedback.trainerId = this.auth.getId();
      console.warn(this.TraineeFeedback);
        this.http.post("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback ).subscribe((res) => {
          });
        }
        else {
            this.http.put("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback).subscribe((res) => {
      });
    }
    window.location.replace("/AssignCourse/"+this.courseId+'/'+this.deptId);
  }
}


