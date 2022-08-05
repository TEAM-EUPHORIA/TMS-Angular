import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-assignmentques',
  templateUrl: './assignmentques.component.html',
  styleUrls: ['./assignmentques.component.css']
})
export class AssignmentquesComponent implements OnInit {

  constructor(private http: HttpClient, public sanitizer: DomSanitizer, private router: Router) { }

  @Input()
  courseId: any;
  @Input()
  topicId: any;
  @Input()
  trainerId: any;

  AssignmentQuestion: any;

  Assignment: any;

  errormsg: any;

  ngOnInit(): void {
    this.GetAssignmentByTrainer(this.trainerId)
  }

  GetAssignmentByTrainer(trainerId: number) {
    this.http.get<any>(baseurl + "Course/" + this.courseId + "/topics/" + this.topicId + "/assignments/" + trainerId).subscribe({
      next: (res: any) => {
        if (res != null)
          this.AssignmentQuestion = res;
      },
      error(err) {
        this.error = err;
      }
    })
  }
  ViewAssignment() {
    this.AssignmentQuestion.base64 = this.AssignmentQuestion.base64 + "," + this.AssignmentQuestion.document;
    this.router.navigate(['/ViewAssignment'], { state: { assignment: this.AssignmentQuestion.base64 } });
  }
}
