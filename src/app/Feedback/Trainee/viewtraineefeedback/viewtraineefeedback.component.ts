import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-viewtraineefeedback',
  templateUrl: './viewtraineefeedback.component.html',
  styleUrls: ['./viewtraineefeedback.component.css']
})
export class ViewtraineefeedbackComponent implements OnInit {
  CourseName: string | any;

  constructor(private route : ActivatedRoute, private auth : LoginService, private http : HttpClient, private router : Router) { }

  data: any;
  id !: number;
  traineeId !: number;
  trainerId !: number;
  courseId !: number;
  Traineename !: any;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.traineeId = this.route.snapshot.params['traineeId'];
    this.trainerId = this.auth.getId();
    this.CourseName = localStorage.getItem('courseName')
    this.GetFeedbackOfTrainee();
  }
  
  GetFeedbackOfTrainee(){
    this.http.get('https://localhost:5001/FeedBack/trainee/'+`${this.courseId}`+`,${this.traineeId}`+`,${this.trainerId}`).subscribe({
      next : (res) => {
        this.data = res;
        console.log(this.data);
      }
    });
  }
  ToEditFeedbackOfTrainee(){
    console.log(this.Traineename)
   this.router.navigate(['/EditTraineeFeedback/'+this.courseId+'/'+this.traineeId+'/'+this.auth.getId()],{state:{TraineeName : this.data.trainee.userName}}); 
  }
}
