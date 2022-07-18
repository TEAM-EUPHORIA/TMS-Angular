import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.css']
})
export class AssignmentlistComponent implements OnInit {

  constructor(private http : HttpClient, public auth : LoginService, private router : Router,public sanitizer:DomSanitizer) { }
  
  @Input()
  courseId : any;
  @Input()
  topicId : any;
  
  ListOfAssignments : any;

  ngOnInit(): void {
    this.GetAssignmentsofTopic();
  }

  GetAssignmentsofTopic(){
    this.http.get<any>("https://localhost:5001/Course/"+ this.courseId +"/topics/"+ this.topicId +"/assignments").subscribe(res => {
      this.ListOfAssignments = res;
      console.log(this.ListOfAssignments);
    })
  }
  ViewAssignment(assignment : any){
    assignment.base64 = assignment.base64 + "," +assignment.document;
    // console.warn(this.assignmenton);
    this.router.navigate(['/ViewAssignment'], {state : { assignment : assignment.base64 }});
  }
}
