import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-givetraineefeedback',
  templateUrl: './givetraineefeedback.component.html',
  styleUrls: ['./givetraineefeedback.component.css']
})
export class GivetraineefeedbackComponent implements OnInit {

  constructor(private router : ActivatedRoute, private http : HttpClient ) { }

  Traineeid: any;
  CourseId = 2;
  TraineeId = 17;
  TrainerId = 7;
  Traineename = 'jack';
  id ! : number;

  TraineeFeedback: any = {
    id: 0,
    traineeId: '',
    trainerId: '',
    courseId: '',
    statusId: 1,
    feedback: ''
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['courseId'];
    this.Traineeid = this.router.snapshot.params['traineeId']
    this.setoption();
  }
  setoption(form?: NgForm) {
    if (this.TraineeFeedback.id != null) {
    }
  }
  OnSubmit() {
    if (this.TraineeFeedback.id == 0 || this.TraineeFeedback.id == null || this.TraineeFeedback.id == undefined) {
      this.http.post("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback).subscribe((res) => {
      })
    }
    else {
      this.http.put("https://localhost:5001/FeedBack/Trainee/feedback", this.TraineeFeedback).subscribe((res) => {
      })
    }
  }
}


