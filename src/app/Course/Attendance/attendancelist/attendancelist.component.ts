import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { baseurl } from 'src/app/URL';

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
  totalLength: any;
  attendance: any[] = [];
  attendancelist: any[] = [];
  attendancelistcopy: any[] = [];
  Coursename: string | any = '';
  Topicname: string | any = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { this.obj = this.router.getCurrentNavigation()?.extras.state?.['aid'] };
  course: any = {}
  obj: any;
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.topicId = this.route.snapshot.params['topicId'];
    this.Coursename = localStorage.getItem('courseName')
    this.Topicname = localStorage.getItem('topicName')
    this.getAttendanceList(this.courseId, this.topicId);
  }
  getAttendanceList(courseId: number, topicId: number) {
    var tempurl = baseurl + "Course/getAttendance/" + `${courseId}/${topicId}`;
    this.http.get(tempurl).subscribe({
      next: (res: any) => {
        this.data = res
        this.attendancelist = res;
        this.attendancelistcopy = res;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  filterByName() {
    const search = document.getElementById("search") as HTMLInputElement
    if (search.value != '') {
      this.attendancelist = this.attendancelistcopy.filter((user: any) => this.getFilteredUsers(user, search))
    } else {
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
