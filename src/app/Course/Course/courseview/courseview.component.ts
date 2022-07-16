import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.css']
})
export class CourseviewComponent implements OnInit {
  
  constructor(private router : Router,
    public auth : LoginService,
    private http : HttpClient) { this.Course = this.router.getCurrentNavigation()?.extras.state?.['courseView']; }
    
  Givefeedback: boolean = false;
  Course : any;
  traineeId = 3;

  ngOnInit(): void {
    console.warn(this.Course);
    this.Givefeedback = (this.Course.feedbacks[0] == null)
  }

  ToTopicView(id : any){
    var topic : any;
    this.http.get("https://localhost:5001/Course/"+this.Course.id+"/topics/"+id).subscribe(res => {
      topic = res;
      console.log(topic.Course)
      this.router.navigate(['/TopicView'],{state : {topicView : topic}})
    })
    
  }
  ToFeedback(){
    var cId : any;
    cId = this.Course.id;
    console.log(cId);
    this.router.navigate(['/ViewCourseFeedback'],{state : {courseId : cId}});
  }
  ToAddFeedback(){
  var cId : any;
  cId = this.Course.id;
    this.router.navigate(['/GiveCourseFeedback'],{state : {cid : cId}}); 
  }
  toviewtraineelist(){
    var obje = {
     courseId : this.Course.id ,
     roleId : this.traineeId,
     feedbacks : this.Course.traineeFeedbacks
    };
    console.log(obje);
    this.router.navigate(['/ViewTraineeList'], {state : {vid : obje}});

    }
  disableTopic(courseId : number,topicId : number){

  }

  toATopic(courseId : number ,topicId :number){
    var obj : any ={
      topicId : topicId,
      courseId : courseId
    };
    this.router.navigate(['/EditTopic'], {state : {aid : obj}});
  }

}
