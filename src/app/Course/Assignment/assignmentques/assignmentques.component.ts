import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-assignmentques',
  templateUrl: './assignmentques.component.html',
  styleUrls: ['./assignmentques.component.css'],
})
export class AssignmentquesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private router: Router
  ) {}

  //Course ID of the assignment
  @Input()
  courseId: any;
  //Topic ID of the assignment
  @Input()
  topicId: any;
  //Trainee ID of the assignment
  @Input()
  trainerId: any;

  //Storing assignment response from the server
  AssignmentQuestion: any;

  ngOnInit(): void {
    this.GetAssignmentByTrainer(this.trainerId);
  }
  //Gets assignment submitted by Trainer of the course
  GetAssignmentByTrainer(trainerId: number) {
    if (
      this.courseId != null &&
      this.topicId != null &&
      this.trainerId != null
    ) {
      this.http
        .get<any>(
          'https://localhost:5001/Course/' +
            this.courseId +
            '/topics/' +
            this.topicId +
            '/assignments/' +
            trainerId
        )
        .subscribe({
          next: (res: any) => {
            if (res != null) this.AssignmentQuestion = res;
          },
          error(err) {
            this.error = err;
          },
        });
    }
  }
  //Function to View individual assignment
  ViewAssignment() {
    this.AssignmentQuestion.base64 =
      this.AssignmentQuestion.base64 + ',' + this.AssignmentQuestion.document;
    this.router.navigate(['/ViewAssignment'], {
      state: { assignment: this.AssignmentQuestion.base64 },
    });
  }
}
