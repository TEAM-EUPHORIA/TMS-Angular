import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendancelist',
  templateUrl: './attendancelist.component.html',
  styleUrls: ['./attendancelist.component.css'],
})
export class AttendancelistComponent implements OnInit {
  //Course ID for the Attendance list
  courseId!: number;

  //Topic ID for the Attendance list
  topicId!: number;

  //Course Name of the Course
  Coursename: string | any = '';
  //Topic Name of the Course
  Topicname: string | any = '';

  //Temparory data for storing
  data: any = [];

  //Pagination variables
  page: number = 1;
  totalLength: any;

  //Storing attendance response from server
  attendancelist: any[] = [];
  //Creating copy of the data received
  attendancelistcopy: any[] = [];

  //Stroing error message from server
  errormsg: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}

  //Component initialization
  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.topicId = this.route.snapshot.params['topicId'];
    this.Coursename = localStorage.getItem('courseName');
    this.Topicname = localStorage.getItem('topicName');
    this.getAttendanceList(this.courseId, this.topicId);
  }

  //Gets list of user assigned in the course
  //with their attendance to the topic
  getAttendanceList(courseId: number, topicId: number) {
    if (courseId != null && topicId != null) {
      var tempurl =
        'https://localhost:5001/Course/getAttendance/' +
        `${courseId}/${topicId}`;
      this.http.get(tempurl).subscribe({
        next: (res: any) => {
          this.data = res;
          this.attendancelist = res;
          this.attendancelistcopy = res;
        },
        error: (err: any) => {
          this.errormsg = err;
        },
      });
    } else {
      this.errormsg = 'Please check the course and topic';
    }
  }

  //Filters the List by the value entered in search box
  filterByName() {
    const search = document.getElementById('search') as HTMLInputElement;
    if (search.value != '') {
      this.attendancelist = this.attendancelistcopy.filter((user: any) =>
        this.getFilteredUsers(user, search)
      );
    } else {
      this.attendancelist = this.attendancelistcopy;
    }
    this.updateCurrentPageAndTotalLength();
  }

  //Pagination function
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.attendancelist.length;
  }

  //Gets list of users based on the search text
  private getFilteredUsers(attendance: any, search: HTMLInputElement): any {
    if (attendance != null) {
      return attendance.owner.fullName
        .toLowerCase()
        .includes(search.value.toLowerCase());
    }
  }
}
