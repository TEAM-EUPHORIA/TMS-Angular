import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { css } from 'jquery';
import { CourseService } from '../../Course/coursecrud.service';
// import { Console } from 'console';

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
  attendance:any[]=[];
  attendancelist:any[]=[];
  attendancelistcopy:any[]=[];
    
  constructor(private route : ActivatedRoute, private http : HttpClient,private router : Router,private cs:CourseService) { this.obj = this.router.getCurrentNavigation()?.extras.state?.['aid']};
  course :any = {}
  obj : any;
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.topicId = this.route.snapshot.params['topicId'];

    this.getAttendanceList(this.courseId,this.topicId);
  }
  getAttendanceList(courseId : number,topicId: number){
    var tempurl = "https://localhost:5001/Course/getAttendance/"+`${courseId}/${topicId}`;
    this.http.get(tempurl).subscribe(res => {
      console.log(res)
     this.data = res
    })
  }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
  }
  filterByName(search: HTMLInputElement) {
    const dropdown = document.getElementById("departmentId")! as HTMLSelectElement
    dropdown.value = ""
    if (search.value != '') {
      console.log(this.attendancelist)
      this.attendancelist = this.attendancelistcopy.filter((attendance: any) => attendance.trainee.fullName.toLowerCase().includes(search.value.toLowerCase()))
      this.updateCurrentPageAndTotalLength();
    } else {
      this.attendancelist = this.attendancelistcopy
      this.updateCurrentPageAndTotalLength();
      dropdown.disabled = false
    }
  }

}
