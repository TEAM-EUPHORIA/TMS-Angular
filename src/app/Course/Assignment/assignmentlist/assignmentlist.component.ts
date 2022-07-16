import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-assignmentlist',
  templateUrl: './assignmentlist.component.html',
  styleUrls: ['./assignmentlist.component.css']
})
export class AssignmentlistComponent implements OnInit {

  constructor(private http : HttpClient, public auth : LoginService) { }
  
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
}
