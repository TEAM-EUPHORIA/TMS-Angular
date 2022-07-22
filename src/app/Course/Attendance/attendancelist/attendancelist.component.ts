import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../Course/coursecrud.service';

@Component({
  selector: 'app-attendancelist',
  templateUrl: './attendancelist.component.html',
  styleUrls: ['./attendancelist.component.css']
})

export class AttendancelistComponent implements OnInit {
  courseId !: number;
  topicId !: number;
  data: any = []
  dept: any
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
    this.http.get(tempurl).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.data = res
        this.attendancelist = res;
        this.attendancelistcopy = res;
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
  filterByName() {
    const search = document.getElementById("search") as HTMLInputElement
    if (search.value != '') {
        this.attendancelist = this.attendancelistcopy.filter((user: any) => this.getFilteredUsers(user,search))
      }else{
        this.attendancelist = this.attendancelistcopy
      }

    this.updateCurrentPageAndTotalLength();
  }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.attendancelist.length;
  }
  private getFilteredUsers(attendance: any, search: HTMLInputElement): any {
    return attendance.owner.fullName.toLowerCase().includes(search.value.toLowerCase());
  }
}
