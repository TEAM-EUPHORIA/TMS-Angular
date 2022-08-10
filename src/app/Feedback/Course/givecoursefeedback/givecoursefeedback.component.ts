import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-givecoursefeedback',
  templateUrl: './givecoursefeedback.component.html',
  styleUrls: ['./givecoursefeedback.component.css'],
})
export class GivecoursefeedbackComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private http: HttpClient,
    private auth: LoginService,
    private route: Router
  ) {}
  Edit: boolean = false;
  txt!: string;
  text!: string;
  CourseName!: string | any;
  courseId!: number;
  CourseFeedback: any;

  //Feedback Model
  Feedback: any = {
    courseId: '',
    traineeId: '',
    feedback: '',
    rating: '',
  };

  //Component initialization
  ngOnInit(): void {
    this.courseId = this.router.snapshot.params['courseId'];
    this.CourseName = localStorage.getItem('courseName');
    if (this.courseId != 0) {
      this.http
        .get(
          baseurl + 'FeedBack/course/' + `${this.courseId},${this.auth.getId()}`
        )
        .subscribe((res) => {
          if (res) {
            this.CourseFeedback = res;
            this.EditFeedback(this.CourseFeedback);
          }
        });
    } else {
      window.location.replace('/PageNotFound');
    }
    if (!this.Edit) {
      this.GiveFeedback();
    }
  }

  //Clicks Submit button
  OnSubmit() {
    this.Feedback.courseId = this.courseId;
    this.Feedback.traineeId = this.auth.getId();
    if (this.CourseFeedback == null) {
      this.http
        .post(baseurl + 'FeedBack/course/feedback', this.Feedback)
        .subscribe((res) => {});
    } else {
      this.http
        .put(baseurl + 'FeedBack/course/feedback', this.CourseFeedback)
        .subscribe((res) => {});
    }
    this.route.navigate(['/Courses/Course/' + `${this.courseId}`]);
  }
  // Update if the Feedback is not null
  EditFeedback(CourseFeedback: any) {
    if (CourseFeedback != null || CourseFeedback != undefined) {
      this.txt = 'Update';
      this.text = 'Edit Coursefeedback';
      this.Edit = true;
    } else {
      alert('Non editable');
    }
  }
  // Set the Submit to button and Give in Header
  GiveFeedback() {
    if (this.CourseFeedback == null || this.CourseFeedback == undefined) {
      this.txt = 'Submit';
      this.text = 'Give Coursefeedback';
    }
  }
}
