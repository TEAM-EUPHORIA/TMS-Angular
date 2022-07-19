import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-givetraineefeedback',
  templateUrl: './givetraineefeedback.component.html',
  styleUrls: ['./givetraineefeedback.component.css']
})
export class GivetraineefeedbackComponent implements OnInit {

  constructor(private route : ActivatedRoute, 
    private http : HttpClient,
    private router : Router,
    private auth : LoginService) { this.Traineename = this.router.getCurrentNavigation()?.extras.state?.['TraineeName'] }

  Traineeid ! : number;
  Traineename = '';
  id !: number;
  trainerId : any;
  courseId : any;

  txt = '';
  button = '';

  TraineeFeedback: any = {
    traineeId: '',
    trainerId: '',
    courseId: '',
    feedback: ''
  }

  ngOnInit(): void {
    this.Traineeid = this.route.snapshot.params['traineeId'];
    this.courseId = this.route.snapshot.params['courseId'];
    this.trainerId = this.route.snapshot.params['trainerId'];
    console.warn("Course ",this.courseId,"Trainee ",this.Traineeid,"Trainer ",this.trainerId,"TrainerName",this.Traineename);
    this.setoption();
  }
  setoption() {
    if (this.trainerId != undefined) {
      this.txt = 'Update';
      this.button = 'Update';
      this.http.get<any>('https://localhost:5001/FeedBack/Trainee/feedback/'+`${this.courseId}`+ this.Traineeid,this.trainerId).subscribe({
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
    if (this.TraineeFeedback.id == 0 || this.TraineeFeedback.id == null || this.TraineeFeedback.id == undefined) {
      this.TraineeFeedback.courseId = this.courseId;
      this.TraineeFeedback.traineeId = this.Traineeid;
      this.TraineeFeedback.trainerId = this.auth.getId();
      console.warn(this.TraineeFeedback);
        this.http.post("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback ).subscribe((res) => {
          })
        }
        else {
            this.http.put("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback).subscribe((res) => {
      })
    }
  }
}


