import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-viewtraineefeedback',
  templateUrl: './viewtraineefeedback.component.html',
  styleUrls: ['./viewtraineefeedback.component.css'],
})
export class ViewtraineefeedbackComponent implements OnInit {
  // Course Name of the Course
  CourseName: string | any;

  constructor(
    private route: ActivatedRoute,
    private auth: LoginService,
    private http: HttpClient,
    private router: Router
  ) {}

  //Storing response from server
  data: any;
  //Trainee Id to whom feedback is given
  traineeId!: number;
  //Trainer Id is who submitted the feedback
  trainerId!: number;
  //Course Id for which the feedback is given
  courseId!: number;
  //Name of Trainee
  Traineename!: any;

  //Component initialization
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.traineeId = this.route.snapshot.params['traineeId'];
    this.trainerId = this.auth.getId();
    this.CourseName = localStorage.getItem('courseName');
    if (this.courseId != 0 && this.traineeId != 0 && this.trainerId != 0)
      this.GetFeedbackOfTrainee();
    else window.location.replace('/PageNotFound');
  }

  // Get a feedback of a trainee submitted by current trainer in the Course
  GetFeedbackOfTrainee() {
    this.http
      .get(
        baseurl +
          'FeedBack/trainee/' +
          `${this.courseId}` +
          `,${this.traineeId}` +
          `,${this.trainerId}`
      )
      .subscribe({
        next: (res) => {
          this.data = res;
        },
      });
  }
}
