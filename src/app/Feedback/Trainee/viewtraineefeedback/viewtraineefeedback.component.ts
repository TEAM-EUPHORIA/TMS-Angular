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

  constructor(private route : ActivatedRoute, private auth : LoginService, private http : HttpClient,) { }

  data: any;
  id !: number;
  Traineeid !: number;

  ngOnInit(): void {
    this.getAllTraineeFeedback()
  }
  getAllTraineeFeedback() {
    this.http.get("https://localhost:5001/FeedBack/trainee").subscribe(res => {
      this.data = res
      console.warn(this.data);
    })
  }
}
