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

  constructor(private route : ActivatedRoute, private http: HttpClient, private Auth : LoginService, private router : Router ) { this.Cname = this.router.getCurrentNavigation()?.extras.state?.['courseName']; }

  data: any;
  id !: number;
  Cname : any;
  userid=this.Auth.getId();
  ngOnInit(): void {
    this.id = this.route.snapshot.params["courseId"]
    console.log(this.Cname)
    this.getAllFeedback(this.id);
  }
  getAllFeedback(id : any) {
    this.http.get("https://localhost:5001/FeedBack/course/"+`${id},${this.Auth.getId()}`).subscribe(res => {
      this.data = res
      console.warn(this.data);
    })
  }
  ToEditFeedback(){
    console.warn(this.Cname)
    this.router.navigate(['/EditCourseFeedback/'+this.id+'/'+this.userid],{state : {courseName : this.Cname}});
  }

}
