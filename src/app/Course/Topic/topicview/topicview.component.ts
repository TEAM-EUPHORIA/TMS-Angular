
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.css']
})
export class TopicviewComponent implements OnInit {
  
  constructor(private router : Router,
    public auth : LoginService,
    private topicService : TopicService,
    private http: HttpClient) { this.temp = this.router.getCurrentNavigation()?.extras.state?.['topicView'];}
    
    //temparary variable for data storage
    temp : any;
    
    submitted: boolean = false;
  //checks upload is enabled or not
  uploadKey : boolean = false;

  //to check the attendance status of trainee
  Ischecked : boolean = false;

  Topic : any;
  public courseId !: number;
  public topicId !:number;
  public ownerId !: number;
  public trainerId !: number;
  
  ngOnInit(): void {
    this.TopicInit();
    this.http.get(baseurl + `Course/${this.temp.courseId}/topics/${this.temp.topicId}/assignments/${this.auth.getId()}`).subscribe(
      res => {
        if(res) this.submitted = true;
      }
    );
  }
  
  TopicInit(){
    this.topicService.GetTopicByCourseIdandTopicId(this.temp.courseId, this.temp.topicId).subscribe(res => {
      this.Topic = res;
      this.ContentInit(this.Topic);
    });
    //need to be solved
    //console.warn(this.Topic);      can't access this variable outside the function
  }

  ContentInit(topic : any){
    topic.content = JSON.parse(topic.content);
    var config = {
      "theme": "snow",
      "modules": {
          "toolbar": false
      }
    };
    var quill = new Quill('#editor', config);
    quill.setContents(topic.content);
    quill.disable();
    this.courseId = topic.courseId;
    this.topicId = topic.topicId;
    this.ownerId = this.auth.getId();
    this.trainerId = this.temp.trainerId;
  }

  toAttendance(){
    var obj : any ={
      topicId : this.topicId,
      courseId : this.courseId
    };
    this.router.navigate(['/Attendance'], {state : {aid : obj}});
  }

  toAssignment(){
    var obj : any ={
      topicId : this.topicId,
      courseId : this.courseId,
      trainerId : this.trainerId
    };
    this.router.navigate(['/UploadAssignment'], {state : {aid : obj}});
    console.log(this.Topic.id);
  }

  HandleSubmit(event : any){
    var Assignmentobj : any ={
      courseId: this.courseId,
      topicId : this.topicId,
      ownerId : this.auth.getId(),
      base64  : event
    }
    this.http.post("https://localhost:5001/Course/assignment",Assignmentobj).subscribe(res => {
      console.log(res);
    });
  }

  MarkAttendance(){
    var Attendanceobj : any ={
      courseId : this.courseId,
      topicId : this.topicId,
      ownerId : this.auth.getId()
    }
    this.http.put("https://localhost:5001/Course/attendance", Attendanceobj).subscribe(res => {
    });  
  }

}

