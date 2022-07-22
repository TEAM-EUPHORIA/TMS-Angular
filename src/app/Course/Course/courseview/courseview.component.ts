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

  constructor(private router: Router,
    public auth: LoginService,
    private route: ActivatedRoute,
    private courseService: CourseService) { }
  canGiveFeedback = false;
  courseId !: number;
  Feedbacks !: any[];
  Givefeedback: boolean = false;
  Course: any;
  traineeRoleId = 3;

  ngOnInit(): void {
    this.CourseInit();
    console.log(this.auth.IsTrainee, this.Givefeedback)
  }
  CourseInit() {
    this.courseId = this.route.snapshot.params['courseId'];
    this.courseService.getCourse(this.courseId).subscribe({
      next: (res: any) => {

        this.Course = res;
        this.courseService.course = res;
        this.Feedbacks = this.Course.feedbacks;
        this.FeedbackInit();
        console.warn(this.Course);
        console.warn(this.Feedbacks);
        console.warn(this.auth.getId());
        this.TopicInit()
      },
      error: (err: any) => {
        // window.location.replace("/")
      }
    });
  }
  FeedbackInit() {
    for (var i = 0; i < this.Feedbacks.length; i++) {
      if (this.auth.getId() == this.Feedbacks[i].traineeId) {
        this.Givefeedback = true;
        break;
      }
    }
  }
  TopicInit(){
    let topicsCompleted = 0;
    for (const item of this.Course.topics) {
      console.log(item)
      if(!item.status){
        topicsCompleted++;
        console.log(topicsCompleted)
      }
    }
    this.canGiveFeedback = topicsCompleted == this.Course.topics.length
  }
  ToTopicView(id: any) {
    this.router.navigate(['CourseView/' + this.Course.id + '/TopicView/' + id], { state: { courseName: this.Course.name } });
  }
  ToViewFeedback() {
    this.router.navigate(['/ViewCourseFeedback/' + this.Course.id + `/` + this.auth.getId()], { state: { courseName: this.Course.name } });
  }
  ToAddFeedback() {
    this.router.navigate(['/GiveCourseFeedback/' + this.Course.id], { state: { courseName: this.Course.name } });
  }
  ToViewTraineeList() {
    var obj = {
      courseId: this.Course.id,
      roleId: this.traineeRoleId,
      feedbacks: this.Course.traineeFeedbacks
    };
    this.router.navigate(['/ViewTraineeList'], { state: { vid: obj } });
  }
  DisableTopic(courseId: number, topicId: number) {
    this.courseService.disableTopic(courseId, topicId).subscribe(() => this.CourseInit());
  }

  ToTopic(courseId: number, topicId: number) {
    this.router.navigate(['/Course/' + courseId + '/Topic/' + topicId], { state: { CourseName: this.Course.name } });
  }
  myfunction(id: number, topicId: number) {
    let text = "Are you sure you want to disable the Topic";
    if (confirm(text) == true) {
      this.DisableTopic(this.courseId, topicId)
    } else {
      text = "You canceled!";
    }
  }
}
