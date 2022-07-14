import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendancelist',
  templateUrl: './attendancelist.component.html',
  styleUrls: ['./attendancelist.component.css']
})
export class AttendancelistComponent implements OnInit {
  courseId !: number;
  topicId !: number;
  data:any
  dept : any
  _user = ''
  page: number = 1;
  totalLength:any;
  constructor(private route : ActivatedRoute, private http : HttpClient,private router : Router) { this.obj = this.router.getCurrentNavigation()?.extras.state?.['aid']};
  
  obj : any;
  ngOnInit(): void {
    this.courseId = this.obj.topicId;
    this.topicId = this.obj.courseId;
    console.warn(this.courseId, "jb", this.topicId);
    this.getAttendanceList(this.courseId,this.topicId);
  }

  getAttendanceList(courseId : number,topicId: number){
    this.http.get("https://localhost:5001/Course/getAttendance?courseId="+`${this.topicId}`+"&topicId="+`${topicId=1}`).subscribe(res => {
      console.log(res)
      this.data = res
    })
  }

}
