
import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Quill from 'quill';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.css']
})
export class TopicviewComponent implements OnInit {

  constructor(private router : Router,
  public auth : LoginService , private http: HttpClient) { this.Topic = this.router.getCurrentNavigation()?.extras.state?.['topicView'];}

  //temparary variable for data storage
  temp : any;
  
  //checks upload is enabled or not
  uploadKey : boolean = false;

  //to check the attendance status of trainee
  Ischecked : boolean = false;

  Topic : any
  Course : any
  courseId!: number;
  topicId!:number;
  ownerId! : number;


  ngOnInit(): void {
    console.warn(this.Topic);
    this.ContentInit();
  }

  ContentInit(){
    this.Topic.content = JSON.parse(this.Topic.content);
    var config = {
      "theme": "snow",
      "modules": {
          "toolbar": false
      }
    };
    var quill = new Quill('#editor', config);
    quill.setContents(this.Topic.content);
    quill.disable();
    this.courseId = this.Topic.courseId;
    this.topicId = this.Topic.topicId;
    this.ownerId = this.auth.getId();
  }
  toAttendance(){
    var obj : any ={
      topicId : this.topicId,
      courseId : this.courseId
    };
    this.router.navigate(['/Attendance'], {state : {aid : obj}});
    console.log(this.Topic.id);
  }

  Onsubmit(){

  }

  MarkAttendance(){
    var data : any ={
      courseId : this.courseId,
      topicId : this.topicId,
      ownerId : this.auth.getId()
    }
    this.http.put("https://localhost:5001/Course/attendance", data).subscribe(res => {
    });
    
  }

}

