
import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.css']
})
export class TopicviewComponent implements OnInit {

  constructor(private router : Router,
  public auth : LoginService) { this.Topic = this.router.getCurrentNavigation()?.extras.state?.['topicView'];}

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


  ngOnInit(): void {
    console.warn(this.Topic);
    this.courseId = this.Topic.courseId;
    this.topicId = this.Topic.topicId;
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
    
  }

}

