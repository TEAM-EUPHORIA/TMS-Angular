import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-viewcoursefeedback',
  templateUrl: './viewcoursefeedback.component.html',
  styleUrls: ['./viewcoursefeedback.component.css']
})
export class ViewcoursefeedbackComponent implements OnInit {

  constructor(private route : ActivatedRoute, private http: HttpClient, private Auth : LoginService, private router : Router ) { this.id = this.router.getCurrentNavigation()?.extras.state?.['courseId']; }

  data: any;
  id : number;

  ngOnInit(): void {
    this.getAllFeedback(this.id);
  }
  getAllFeedback(id : any) {
    this.http.get("https://localhost:5001/FeedBack/course/"+`${id},${this.Auth.getId()}`).subscribe(res => {
      this.data = res
      console.warn(this.data);
    })
  }
  ToEditFeedback(){
    var feedback : any;
    console.warn(this.data);
    feedback = this.data;
    console.warn(feedback);
    this.router.navigate(['/EditCourseFeedback'],{state : {fid : feedback}});
  }

}
