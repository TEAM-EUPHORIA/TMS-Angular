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
  traineeRoleId = 3;

  ngOnInit(): void {
    console.warn(this.Course);
    this.Givefeedback = (this.Course.feedbacks[0] == null)
  }

  ToTopicView(id : any){
    var topicobj : any = {
      courseId : this.Course.id,
      topicId : id,
      trainerId : this.Course.trainer.id
    };
    this.router.navigate(['/TopicView'],{state : {topicView : topicobj} });
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
  ToViewTraineeList(){
    var obj = {
     courseId : this.Course.id ,
     roleId : this.traineeRoleId,
     feedbacks : this.Course.traineeFeedbacks
    };
    this.router.navigate(['/ViewTraineeList'], {state : {vid : obj}});

    }
  DisableTopic(courseId : number,topicId : number){

  }

  ToTopic(courseId : number ,topicId :number){
    var obj : any ={
      topicId : topicId,
      courseId : courseId
    };
    this.router.navigate(['/EditTopic'], {state : {aid : obj}});
  }

}
