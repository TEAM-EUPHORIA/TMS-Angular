import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-viewtraineefeedback',
  templateUrl: './viewtraineefeedback.component.html',
  styleUrls: ['./viewtraineefeedback.component.css']
})
export class ViewtraineefeedbackComponent implements OnInit {

  constructor(private route : ActivatedRoute, private auth : LoginService, private http : HttpClient) { }

  data: any;
  id !: number;
  traineeId !: number;
  trainerId !: number;
  courseId !: number;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.traineeId = this.route.snapshot.params['traineeId'];
    this.trainerId = this.route.snapshot.params['trainerId'];
    this.getAllTraineeFeedback();
  }
  getAllTraineeFeedback() {
    this.http.get("https://localhost:5001/FeedBack/trainee").subscribe(res => {
      this.data = res
      console.warn(this.data);
    })
  }
  GetFeedbackOfTrainee(){
    this.http.get('https://localhost:5001/FeedBack/trainee/'+`${this.courseId}`+`${this.traineeId}`+`${this.trainerId}`).subscribe({
      next : (res) => {

      }
    });
  }
}
