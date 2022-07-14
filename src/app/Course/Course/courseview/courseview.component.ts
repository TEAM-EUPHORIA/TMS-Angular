import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-courseview',
  templateUrl: './courseview.component.html',
  styleUrls: ['./courseview.component.css']
})
export class CourseviewComponent implements OnInit {
  
  constructor(private router : Router,
    public auth : LoginService,
    private http : HttpClient) { this.Course = this.router.getCurrentNavigation()?.extras.state?.['courseView']; }
    
  Givefeedback: boolean = false;
  Course : any;
  ngOnInit(): void {
    console.warn(this.Course);
    this.Givefeedback = (this.Course.topics[0] == null)
  }

  ToTopicView(id : any){
    var topic : any;
    this.http.get("https://localhost:5001/Course/"+this.Course.id+"/topics/"+id).subscribe(res => {
      topic = res;
      this.router.navigate(['/TopicView'],{state : {topicView : topic}})
    })
  }
  disableTopic(courseId : number,topicId : number){

  }

}
