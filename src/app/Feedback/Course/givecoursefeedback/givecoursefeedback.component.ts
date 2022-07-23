import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-givecoursefeedback',
  templateUrl: './givecoursefeedback.component.html',
  styleUrls: ['./givecoursefeedback.component.css']
})
export class GivecoursefeedbackComponent implements OnInit {

  constructor(private router: ActivatedRoute, private http: HttpClient, private auth: LoginService, private route: Router) {
    this.CourseFeedback = this.route.getCurrentNavigation()?.extras.state?.['fid'];
    this.name = this.route.getCurrentNavigation()?.extras.state?.['courseName'];
  }
  Add: boolean = true;
  Edit: boolean = false;
  txt !: string;
  Traineeid !: number;
  text !: string;
  data: any
  name: any;
  Course !: string;
  id !: number;
  temp: any;
  CourseFeedback: any;
  Feedback: any = {
    courseId: '',
    traineeId: '',
    feedback: '',
    rating: ''
  }


  ngOnInit(): void {
    console.log(this.name)
    this.id = this.router.snapshot.params['courseId'];
    this.http.get("https://localhost:5001/FeedBack/course/" + `${this.id},${this.auth.getId()}`).subscribe(res => {
      if (res) {
        this.CourseFeedback = res;
        this.Add = false;
        this.EditFeedback(this.CourseFeedback);
      }
    });
    if (this.Add == true) {
      this.GiveFeedback();
    }
  }

  OnSubmit() {
    this.Feedback.courseId = this.id;
    this.Feedback.traineeId = this.auth.getId();
    console.warn(this.Feedback);
    if (this.CourseFeedback == null) {
      this.http.post("https://localhost:5001/FeedBack/course/feedback", this.Feedback).subscribe((res) => {
        console.log(res);
      })
    }
    else {
      this.http.put("https://localhost:5001/FeedBack/course/feedback", this.CourseFeedback).subscribe((res) => {
        console.log(res);
      })
    }
    this.route.navigate(['/Courses/Course/' + `${this.id}`])
  }
  EditFeedback(CourseFeedback: any) {
    console.warn(CourseFeedback);
    if (CourseFeedback != null || CourseFeedback != undefined) {
      this.txt = "Update";
      this.text = "Edit Coursefeedback";
      this.Edit = true;
    }
    else {
      alert("Non editable");
    }
  }
  GiveFeedback() {
    if (this.CourseFeedback == null || this.CourseFeedback == undefined) {
      this.txt = "Submit";
      this.text = "Give Coursefeedback";
      this.Add = true;
    }
  }
}

