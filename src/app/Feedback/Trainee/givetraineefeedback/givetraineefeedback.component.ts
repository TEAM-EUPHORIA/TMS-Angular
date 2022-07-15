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

  constructor(private route : ActivatedRoute, private http : HttpClient , private router : Router , private auth : LoginService) { this.objec = this.router.getCurrentNavigation()?.extras.state?.['rid'] }

  Traineeid: any;
  Traineename = '';
  id ! : number;
  objec : any;
  trainerId : any;
  courseId : any;

  TraineeFeedback: any = {
    id: 0,
    traineeId: '',
    trainerId: '',
    courseId: '',
    statusId: 1,
    feedback: ''
  }

  ngOnInit(): void {
    this.courseId = this.objec.courseId
    this.Traineeid = this.objec.traineeId;
    this.Traineename = this.objec.traineeName;
    this.trainerId = this.auth.getId();
    console.warn(this.id,this.Traineeid,this.Traineename);
    this.setoption();
  }
  setoption(form?: NgForm) {
    if (this.TraineeFeedback.id != null) {
    }
  }
  OnSubmit() {
    this.TraineeFeedback.courseId = this.courseId;
    this.TraineeFeedback.traineeId = this.Traineeid;
    this.TraineeFeedback.trainerId = this.trainerId;
    console.warn(this.TraineeFeedback);
    if (this.TraineeFeedback.id == 0 || this.TraineeFeedback.id == null || this.TraineeFeedback.id == undefined) {
      this.http.post("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback ).subscribe((res) => {
      })
    }
    else {
      this.http.put("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback).subscribe((res) => {
      })
    }
  }
}


