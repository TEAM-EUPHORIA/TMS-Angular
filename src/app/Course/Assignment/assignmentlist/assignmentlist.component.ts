import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.css'],
})
export class AssignmentlistComponent implements OnInit {

  //Course ID of the assignment list
  @Input()
  courseId: any;
  //Topic ID of the assignment list
  @Input()
  topicId: any;

  //Storing the response data from server
  ListOfAssignments: any;

  ngOnInit(): void {
    this.GetAssignmentsofTopic();
  }

  //Function to get list of assignments
  GetAssignmentsofTopic() {
    if (this.courseId != null && this.topicId != null) {
      this.http
        .get<any>(
          baseurl +
            'Course/' +
            this.courseId +
            '/topics/' +
            this.topicId +
            '/assignments'
        )
        .subscribe((res) => {
          this.ListOfAssignments = res;
          console.log(this.ListOfAssignments);
        });
    }
  }

  //Function to View individual assignment
  ViewAssignment(assignment: any) {
    if (assignment != null && assignment != undefined) {
      assignment.base64 = assignment.base64 + ',' + assignment.document;
      this.router.navigate(['/ViewAssignment'], {
        state: { assignment: assignment.base64 },
      });
    }
  }
}
