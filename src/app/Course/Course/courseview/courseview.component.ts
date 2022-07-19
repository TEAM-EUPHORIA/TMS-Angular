import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../coursecrud.service';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.css']
})
export class CourseviewComponent implements OnInit {
  
  constructor(private router : Router,
    public auth : LoginService,
    private route : ActivatedRoute,
    private courseService : CourseService) { }
    
  courseId !: number;
  Givefeedback: boolean = false;
  Course : any;
  traineeRoleId = 3;

  ngOnInit(): void {
    this.CourseInit();
  }
  CourseInit(){
    this.courseId = this.route.snapshot.params['courseId'];
    this.courseService.getCourse(this.courseId).subscribe(res => {
      this.Course = res;
      this.Givefeedback = (this.Course.feedbacks[0] == null)
      console.warn(this.Course);
    });
  }
  ToTopicView(id : any){
    this.router.navigate(['CourseView/'+this.Course.id+'/TopicView/'+id]);
  }
  ToFeedback(){
    this.router.navigate(['/ViewCourseFeedback/'+this.Course.id+`/`+this.auth.getId()]);
  }
  ToAddFeedback(){
  var cId : any;
  cId = this.Course.id;
    this.router.navigate(['/GiveCourseFeedback/'+this.Course.id]); 
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
    this.courseService.disableTopic(courseId,topicId).subscribe(() =>this.CourseInit());
  }

  ToTopic(courseId : number ,topicId :number){
    this.router.navigate(['/Course/'+courseId +'/Topic/'+ topicId]);
  }

}
