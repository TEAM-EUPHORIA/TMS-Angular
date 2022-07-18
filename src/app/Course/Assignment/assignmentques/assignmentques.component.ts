import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignmentques',
  templateUrl: './assignmentques.component.html',
  styleUrls: ['./assignmentques.component.css']
})
export class AssignmentquesComponent implements OnInit {

  constructor(private http : HttpClient, public sanitizer : DomSanitizer, private router : Router) { }

  @Input()
  courseId : any;
  @Input()
  topicId : any;
  @Input()
  trainerId : any;
  
  AssignmentQuestion : any;

  Assignment : any;

  errormsg : any;

  ngOnInit(): void {
    this.GetAssignmentByTrainer(this.trainerId)
  }

  GetAssignmentByTrainer(trainerId : number){
    this.http.get<any>("https://localhost:5001/Course/"+ this.courseId +"/topics/"+ this.topicId +"/assignments/"+ trainerId).subscribe({
      next: (res:any) =>{
        if(res != null)
        this.AssignmentQuestion = res;
        console.warn("hi assignment")
      },
      error(err){
        this.error = err;
        console.warn(err["error"]);
      } 
    })
  }
  ViewAssignment(){
    this.AssignmentQuestion.base64 = this.AssignmentQuestion.base64 + "," +this.AssignmentQuestion.document;
    // console.warn(this.AssignmentQuestion);
    this.router.navigate(['/ViewAssignment'], {state : { assignment : this.AssignmentQuestion.base64 }});
  }
}
