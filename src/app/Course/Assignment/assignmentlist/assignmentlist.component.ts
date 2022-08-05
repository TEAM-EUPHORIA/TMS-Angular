import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.css']
})
export class AssignmentlistComponent implements OnInit {

  constructor(private http: HttpClient, public auth: LoginService, private router: Router, public sanitizer: DomSanitizer) { }

  @Input()
  courseId: any;
  @Input()
  topicId: any;

  ListOfAssignments: any;

  ngOnInit(): void {
    this.GetAssignmentsofTopic();
  }

  GetAssignmentsofTopic() {
    this.http.get<any>(baseurl + this.courseId + "/topics/" + this.topicId + "/assignments").subscribe(res => {
      this.ListOfAssignments = res;
    })
  }
  ViewAssignment(assignment: any) {
    assignment.base64 = assignment.base64 + "," + assignment.document;
    this.router.navigate(['/ViewAssignment'], { state: { assignment: assignment.base64 } });
  }
}
