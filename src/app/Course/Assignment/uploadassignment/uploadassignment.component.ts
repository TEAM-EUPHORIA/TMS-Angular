import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CourseService } from '../../course.service';
import { TopicService } from '../../Topic/topic.service';

@Component({
  selector: 'app-uploadassignment',
  templateUrl: './uploadassignment.component.html',
  styleUrls: ['./uploadassignment.component.css']
})
export class UploadassignmentComponent implements OnInit {

  constructor(private upload: CourseService, private assignment: TopicService, private route : ActivatedRoute, private router : Router) 
  {this.Assignment = this.router.getCurrentNavigation()?.extras.state?.['aid'] }
  data: any;
  Assignment : any;
  topicId!: number;
  courseId!: number;
  trainerId! : number;

  doc: any = {
    courseId: '',
    ownerId: '',
    TopicId: '',
    base64: ""
  }
  @Output()
  SubmittedAssignment : EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    // this.topicId = this.route.snapshot.params['topicId']
    // this.courseId = this.route.snapshot.params['courseId']
    // this.trainerId = this.route.snapshot.params['trainerId']
    this.topicId = this.Assignment.topicId;
    this.courseId = this.Assignment.courseId;
    this.trainerId = this.Assignment.trainerId;
    console.warn(this.topicId,this.courseId,this.trainerId);
    this.getAssignmentByCourseIdTopicIdAndOwnerId(this.topicId,this.courseId,this.trainerId);
  }
  Onsubmit() {
    console.warn(this.doc.base64);
    this.SubmittedAssignment.emit(this.doc.base64);
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.doc.base64 = reader.result.toString()
    };
  }
  getAssignmentByCourseIdTopicIdAndOwnerId(cid : number, tid : number, oid : number){
    this.assignment.getAssignmentByCourseIdTopicIdAndOwnerId(cid,tid,oid).subscribe((res)=>{
      this.data = res;
      console.warn(this.data + "hello")
    })
  }
}
