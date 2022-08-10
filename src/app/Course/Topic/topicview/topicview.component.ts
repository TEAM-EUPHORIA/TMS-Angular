import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import Quill from 'quill';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.css'],
})
export class TopicviewComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: LoginService,
    private topicService: TopicService,
    public datepipe: DatePipe,
    public sanitizer: DomSanitizer,
    private http: HttpClient,
    private toastService: HotToastService
  ) {}

  //Course Id, Topic Id  of the Course and topic
  public courseId!: number;
  public topicId!: number;
  //Owner Id for submitting assignment
  public ownerId!: number;
  //Trainer Id for getting assignment Question
  public trainerId!: number;

  //Storing assignment of current user
  assignment: any = {};

  // Boolean checks for User submitted assignment or not
  submitted: boolean = false;

  //checks upload is enabled or not
  uploadKey: boolean = true;

  //to check the attendance status of trainee
  Checked: boolean = false;

  //Boolean to check topic is completed
  TopicChecked: boolean = false;

  Coursename: any;
  // Storing Topic respomse from the Server
  Topic: any;

  //Component initialization
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.topicId = this.route.snapshot.params['topicId'];
    this.Coursename = localStorage.getItem('courseName');
    if (this.courseId != 0 && this.topicId != 0) {
      this.TopicInit();
      if (this.auth.IsloggedIn) {
        this.http
          .get(
            baseurl +
              `Course/${this.courseId}/topicourseService/${
                this.topicId
              }/assignments/${this.auth.getId()}`
          )
          .subscribe((res) => {
            if (res) {
              this.assignment = res;
              this.submitted = true;
              this.uploadKey = false;
            }
          });
      }
    } else {
      window.location.replace('/PageNotFound');
    }
  }
  // Topic content Initialization
  TopicInit() {
    this.topicService
      .GetTopicByCourseIdandTopicId(this.courseId, this.topicId)
      .subscribe({
        next: (res: any) => {
          this.Topic = res;
          localStorage.setItem('topicName', res.name);
          this.Checked =
            this.Topic.attendances[0] != null ||
            this.Topic.attendances.length > 1;
          if (this.Topic != null) {
            this.ContentInit(this.Topic);
          }
          this.TopicChecked = this.Topic.status;
        },
        error: (err: any) => {
          window.location.replace('/');
        },
      });
  }
  ContentInit(topic: any) {
    if (topic != null) {
      topic.content = JSON.parse(topic.content);
      var quill = new Quill('#editor');
      quill.setContents(topic.content);
      quill.disable();
      this.ownerId = this.auth.getId();
      this.trainerId = this.trainerId;
    } else {
      window.location.replace('/InvalidRequest');
    }
  }

  // Navigate to View Assignment page
  ViewAssignment(assignment: any) {
    if (assignment != null) {
      assignment.base64 = assignment.base64 + ',' + assignment.document;
      this.router.navigate(['/ViewAssignment'], {
        state: { assignment: assignment.base64 },
      });
    } else {
      window.location.replace('/InvalidRequest');
    }
  }

  // Handle event emitted from child component upload assignment
  HandleSubmit(event: any) {
    if (event != null) {
      var Assignmentobj: any = {
        courseId: this.courseId,
        topicId: this.topicId,
        ownerId: this.auth.getId(),
        base64: event,
      };
      this.http
        .post(baseurl + 'Course/assignment', Assignmentobj)
        .subscribe((res) => {});
      window.location.reload();
      this.toastService.success('The assignment was submitted successfully');
    } else {
      window.location.replace('/InvalidRequest');
    }
  }

  // MarkAttendance to a Topic by Trainee
  MarkAttendance() {
    var Attendanceobj: any = {
      courseId: this.courseId,
      topicId: this.topicId,
      ownerId: this.auth.getId(),
    };
    if (
      Attendanceobj.courseId != 0 &&
      Attendanceobj.topicId != 0 &&
      Attendanceobj.ownerId
    ) {
      this.http
        .put(baseurl + 'Course/attendance', Attendanceobj)
        .subscribe((res) => {
          this.toastService.success(
            'The attendance was submitted successfully'
          );
          window.location.reload();
        });
    } else {
      window.location.replace('/InvalidRequest');
    }
  }

  // Mark Topic status as completed by Trainee and Trainer
  MarkTopicStatus() {
    var TopicStatusobj: any = {
      courseId: this.courseId,
      topicId: this.topicId,
      ownerId: this.auth.getId(),
    };
    if (
      TopicStatusobj.courseId &&
      TopicStatusobj.topicId &&
      TopicStatusobj.ownerId
    ) {
      this.http
        .put(baseurl + 'Course/MarkAsComplete', TopicStatusobj)
        .subscribe((res) => {
          this.toastService.success('Marked as topic completed');
          window.location.reload();
        });
    } else {
      window.location.replace('/InvalidRequest');
    }
  }
}
