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

  constructor(private upload: CourseService, private assignment: TopicService, private router : Router) 
  { }

  base64 = '';

  @Output()
  SubmittedAssignment : EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }
  
  Onsubmit() {
    this.SubmittedAssignment.emit(this.base64);
  }

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.base64 = reader.result.toString();
    };
  }
  
}
