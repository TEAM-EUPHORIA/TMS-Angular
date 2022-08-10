import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.css'],
})
export class CourseviewComponent implements OnInit {
  constructor(
    private router: Router,
    public auth: LoginService,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  //boolean to check CourseFeedback is enabled or not
  canGiveFeedback = false;
  //Course Id of the Course
  courseId!: number;
  // Contains feedbacks of the Course
  Feedbacks!: any[];
  // Boolean checks the trainee Give/View his Course Feedback
  Givefeedback: boolean = false;

  Course: any;

  // traineeRoleId = 3;

  //Component initialization
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    if (this.courseId != 0 && this.courseId) {
      this.CourseInit();
    } else {
      window.location.replace('/PageNotFound');
    }
  }

  //Course Initialization
  CourseInit() {
    this.courseService.getCourse(this.courseId).subscribe({
      next: (res: any) => {
        localStorage.setItem('courseName', res.name);
        this.Course = res;
        this.Feedbacks = this.Course.feedbacks;
        this.FeedbackInit();
        this.TopicInit();
      },
      error: (err: any) => {},
    });
  }
  //Feedback Initialization
  FeedbackInit() {
    if (this.Feedbacks != null) {
      for (var i = 0; i < this.Feedbacks.length; i++) {
        if (this.auth.getId() == this.Feedbacks[i].traineeId) {
          this.Givefeedback = true;
          break;
        }
      }
    }
  }
  //Topic Initialization
  TopicInit() {
    let topicsCompleted = 0;
    if (this.Course.topics != null) {
      for (const item of this.Course.topics) {
        if (item.status) {
          topicsCompleted++;
        }
      }
      // Checks trainee can give feedback to Course
      this.canGiveFeedback = topicsCompleted == this.Course.topics.length;
    }
  }

  // Navigate to Edit topic page
  ToEditTopic(id: any) {
    if (id != 0)
      this.router.navigateByUrl(
        '/Course/' + this.Course.id + '/Edit/Topic/' + id
      );
  }

  // Navigate to View Course Feedback given by the Trainee
  ToViewFeedback() {
    this.router.navigate([
      `/Course/${this.Course.id}/Feedback/${this.auth.getId()}`,
    ]);
  }

  //Navigate to Give Feedback about the course by Trainee
  ToAddFeedback() {
    if (this.courseId != 0)
      this.router.navigate([`Course/${this.Course.id}/Feedback/Add`]);
  }

  // Function to disable Topic of specific Course
  DisableTopic(courseId: number, topicId: number) {
    this.courseService
      .disableTopic(courseId, topicId)
      .subscribe(() => this.CourseInit());
  }

  // Navigate to Individual topic
  ToTopic(courseId: number, topicId: number) {
    if (courseId != 0 && topicId == 0)
      this.router.navigate(['/Course/' + courseId + '/Topic/' + topicId]);
    else window.location.replace('/PageNotFound');
  }

  //Display dialog for Disable conformation
  myfunction(id: number, topicId: number) {
    if (id != 0 && topicId != 0) {
      let text = 'Are you sure you want to disable the Topic';
      if (confirm(text) == true) {
        this.DisableTopic(id, topicId);
      } else {
        text = 'You canceled!';
      }
    }
  }
}
