import { HttpClient } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route : ActivatedRoute, private http : HttpClient,private router : Router) { this.obj = this.router.getCurrentNavigation()?.extras.state?.['aid']};
  
  obj : any;
  ngOnInit(): void {
    this.courseId = this.obj.topicId;
    this.topicId = this.obj.courseId;
    console.warn(this.courseId, "jb", this.topicId);
    this.getAttendanceList(this.courseId,this.topicId);
  }
  

  getAttendanceList(courseId : number,topicId: number){
    this.http.get("https://localhost:5001/Course/getAttendance?courseId="+`${this.topicId}`+"&topicId="+`${topicId=1}`).subscribe((res:any) => {
      // console.log(res)
      // this.data = res
      this.attendancelist = res
      this.attendancelistcopy = res
      console.log(res)
     
    })
  }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.attendancelist.length;
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
