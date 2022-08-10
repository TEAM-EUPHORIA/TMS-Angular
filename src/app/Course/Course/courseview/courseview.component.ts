import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.css']
})
export class CourseviewComponent implements OnInit {

  constructor(private router: Router,
    public auth: LoginService,
    private route: ActivatedRoute,
    private courseService: CourseService)
  { }
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
        localStorage.setItem('courseName',res.name)
        
        this.Course = res;
        this.Feedbacks = this.Course.feedbacks;
        this.FeedbackInit();
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
  TopicInit() {
    let topicsCompleted = 0;
    for (const item of this.Course.topics) {
      if (item.status) {
        topicsCompleted++;
      }
    }
    this.canGiveFeedback = topicsCompleted == this.Course.topics.length
  }
  ToTopicView(id: any) {
    this.router.navigate(['/Course/' + this.Course.id + '/Topic/' + id], { state: { courseName: this.Course.name } });
  }
  ToEditTopic(id: any) {
    this.router.navigateByUrl('/Course/' + this.Course.id + '/Edit/Topic/' + id);
  }
  ToViewFeedback() {
    this.router.navigate([`/Course/${this.Course.id}/Feedback/${this.auth.getId()}`], { state: { courseName: this.Course.name } });
  }
  ToAddFeedback() {
    this.router.navigate([`Course/${this.Course.id}/Feedback/Add`], { state: { courseName: this.Course.name } });
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
