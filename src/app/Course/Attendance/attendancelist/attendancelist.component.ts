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
  data: any
  dept: any
  _user = ''
  page: number = 1;
  totalLength: any;
  attendance: any[] = [];
  attendancelist: any[] = [];
  attendancelistcopy: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private cs: CourseService) { this.obj = this.router.getCurrentNavigation()?.extras.state?.['aid'] };
  course: any = {}
  obj: any;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.topicId = this.route.snapshot.params['topicId'];
    this.getAttendanceList(this.courseId, this.topicId);
    this.course = this.cs.course;
    console.log(this.course)
  }
  getAttendanceList(courseId: number, topicId: number) {
    this.http.get("https://localhost:5001/Course/getAttendance?courseId=" + `${this.courseId}` + "&topicId=" + `${this.topicId}`).subscribe(res => {
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
