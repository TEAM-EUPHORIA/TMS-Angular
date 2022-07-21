
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastModule, HotToastService, Toast } from '@ngneat/hot-toast';
import Quill from 'quill';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';
import { CourseService } from '../../Course/coursecrud.service';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.css']
})
export class TopicviewComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    public auth: LoginService,
    private topicService: TopicService,
    public datepipe: DatePipe,
    public sanitizer: DomSanitizer,
    private http: HttpClient,
    private cs: CourseService,
    private toastService: HotToastService) { this.Coursename = this.router.getCurrentNavigation()?.extras.state?.['courseName'] }

  //temparary variable for data storage
  temp: any;


  submitted: boolean = false;
  //checks upload is enabled or not
  uploadKey: boolean = true;

  //to check the attendance status of trainee
  Checked: boolean = false;
  TopicChecked : boolean=false;

  Coursename: any;

  Topic: any;
  public courseId !: number;
  public topicId !: number;
  public ownerId !: number;
  public trainerId !: number;

  assignment: any = {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.topicId = this.route.snapshot.params['topicId'];
    this.TopicInit();
    if (this.auth.IsloggedIn) {
      this.http.get(baseurl + `Course/${this.courseId}/topics/${this.topicId}/assignments/${this.auth.getId()}`).subscribe(
        res => {
          if (res) {
            this.assignment = res;
            this.submitted = true
            this.uploadKey = false;
            console.log(res)
          }
        }
      );
    }
    // console.log(this.auth.IsTrainee || this.Topic.assignments[0] != null)
  }

  TopicInit() {
    this.topicService.GetTopicByCourseIdandTopicId(this.courseId, this.topicId).subscribe({

      next: (res: any) => {
        this.Topic = res;
        this.Checked = (this.Topic.attendances[0] != null || this.Topic.attendances.length > 1);
        if (this.Topic != null) {
          this.ContentInit(this.Topic);
        }
        this.TopicChecked = this.Topic.status;
      },
      error: (err: any) => {
        window.location.replace("/")
      }
    });
  }

  ContentInit(topic: any) {
    topic.content = JSON.parse(topic.content);
    var quill = new Quill('#editor');
    quill.setContents(topic.content);
    quill.disable();
    this.courseId = topic.courseId;
    this.topicId = topic.topicId;
    this.ownerId = this.auth.getId();
    this.trainerId = this.trainerId;
    console.warn(this.Topic)
  }

  ToAttendanceList() {
    this.router.navigate(['/AttendanceList/' + this.courseId + '/' + this.topicId]);
  }

  ToAssignment() {
    var obj: any = {
      topicId: this.topicId,
      courseId: this.courseId,
      trainerId: this.trainerId
    };
    this.router.navigate(['/UploadAssignment'], { state: { aid: obj } });
    console.log(this.Topic.id);
  }

  ViewAssignment(assignment: any) {
    assignment.base64 = assignment.base64 + "," + assignment.document;
    // console.warn(this.assignmenton);
    this.router.navigate(['/ViewAssignment'], { state: { assignment: assignment.base64 } });
  }

  HandleSubmit(event: any) {
    var Assignmentobj: any = {
      courseId: this.courseId,
      topicId: this.topicId,
      ownerId: this.auth.getId(),
      base64: event
    }
    this.http.post("https://localhost:5001/Course/assignment", Assignmentobj).subscribe(res => {
      console.log(res);
    });
    window.location.reload();
    this.toastService.success("The assignment was submitted successfully")

  }

  MarkAttendance() {
    var Attendanceobj: any = {
      courseId: this.courseId,
      topicId: this.topicId,
      ownerId: this.auth.getId()
    }
    this.http.put("https://localhost:5001/Course/attendance", Attendanceobj).subscribe(res => {
      console.log("any")
      this.toastService.success("The attendance was submitted successfully")

    });
  }
  MarkTopicStatus(){
   var TopicStatusobj : any ={
    courseId : this.courseId,
    topicId : this.topicId,
    ownerId : this.auth.getId()
   } 
   this.http.put("https://localhost:5001/Course/MarkAsComplete", TopicStatusobj).subscribe(res =>{
    this.toastService.success("Marked as topic completed")
   });
  }
  
}

