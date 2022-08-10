import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-viewcoursefeedback',
  templateUrl: './viewcoursefeedback.component.html',
  styleUrls: ['./viewcoursefeedback.component.css'],
})
export class ViewcoursefeedbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private Auth: LoginService,
    private router: Router
  ) {}

  //Stores response from server
  data: any;
  //Course Id of the Course
  courseId!: number;
  //Trainee Id of the Course
  traineeId!: number;
  //Course Name of the Course
  CourseName!: string | any;

  //Component initialization
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.traineeId = this.route.snapshot.params['traineeId'];
    this.CourseName = localStorage.getItem('courseName');
    if (this.courseId != 0 && this.traineeId != 0) {
      this.getAllFeedback(this.courseId);
    } else {
      window.location.replace('/PageNotFound');
    }
  }

  // Gets All Feedback in the Course
  getAllFeedback(id: any) {
    if (id != 0 && id != null) {
      if (this.traineeId == this.Auth.getId()) {
        this.http
          .get(baseurl + 'FeedBack/course/' + `${id},${this.Auth.getId()}`)
          .subscribe({
            next: (res) => {
              this.data = res;
            },
            error: (err: any) => {},
          });
      }
    } else {
      window.location.replace('/InvalidRequest');
    }
  }
}
