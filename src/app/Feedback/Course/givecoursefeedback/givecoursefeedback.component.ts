import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-givecoursefeedback',
  templateUrl: './givecoursefeedback.component.html',
  styleUrls: ['./givecoursefeedback.component.css']
})
export class GivecoursefeedbackComponent implements OnInit {

  constructor(private router : ActivatedRoute, private http : HttpClient , private auth : LoginService , private route : Router) { 
    this.CourseFeedback = this.route.getCurrentNavigation()?.extras.state?.['fid'];
    this.CourseId = this.route.getCurrentNavigation()?.extras.state?.['cid'];
  }
  Add : boolean = false;
  Edit : boolean = false;
  txt !: string;
  Traineeid !: number;
  text ! : string;
  data: any
  CourseId : any;
  Course !: string;
  id !: number;
  temp: any;
  CourseFeedback: any;
  Feedback : any = {
    courseId : '',
    traineeId : '',
    feedback: '',
    rating: ''
  }

  ngOnInit(): void {
    console.warn(this.CourseFeedback)
    if(this.CourseFeedback != undefined || this.CourseFeedback != null){
      this.txt = "Update";
      this.text = "Edit Coursefeedback";
      this.Edit  = true;
      console.log(this.CourseFeedback)
    }else {
      this.txt = "Submit";
      this.text = "Give Coursefeedback";
      this.Add = true;
    }
  }
  
  OnSubmit() {
    this.Feedback.courseId = this.CourseId;
    this.Feedback.traineeId = this.auth.getId();
    console.warn(this.Feedback);
    if (this.CourseFeedback == undefined || this.CourseFeedback == null) {
      this.http.post("https://localhost:5001/FeedBack/course/feedback",this.Feedback).subscribe((res) => {
        console.log(res);
      })
    }
    else {
      this.http.put("https://localhost:5001/FeedBack/course/feedback",this.CourseFeedback).subscribe((res) => {
        console.log(res);
      })
    }
    this.route.navigate(['/CourseView'])
  }

}

