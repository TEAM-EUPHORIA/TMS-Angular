import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';

@Component({
  selector: 'app-viewcoursefeedback',
  templateUrl: './viewcoursefeedback.component.html',
  styleUrls: ['./viewcoursefeedback.component.css']
})
export class ViewcoursefeedbackComponent implements OnInit {
  CourseName!: string | any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private Auth: LoginService, private router: Router) { }

  data: any;
  courseId !: number;
  traineeId !: number;
  Cname: any;
  userid = this.Auth.getId();
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params["courseId"]
    this.traineeId = this.route.snapshot.params["traineeId"]
    console.log(localStorage.getItem('courseName'))
    this.CourseName = localStorage.getItem('courseName')
    this.getAllFeedback(this.courseId);
  }
  getAllFeedback(id: any) {
    if (this.traineeId == this.Auth.getId()) {
      this.http.get(baseurl + "FeedBack/course/" + `${id},${this.Auth.getId()}`).subscribe({
        next: (res) => {
          this.data = res
          console.warn(this.data);
        }, error: (err: any) => {

        }
      });
    }
    else {
      // window.location.replace("/")
    }
  }
  ToEditFeedback() {
    console.warn(this.Cname)
    this.router.navigate(['/EditCourseFeedback/' + this.courseId + '/' + this.userid], { state: { courseName: this.Cname } });
  }

}
