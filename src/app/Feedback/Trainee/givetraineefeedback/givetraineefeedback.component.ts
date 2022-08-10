import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';
import { UserService } from 'src/app/User/user.service';

@Component({
  selector: 'app-givetraineefeedback',
  templateUrl: './givetraineefeedback.component.html',
  styleUrls: ['./givetraineefeedback.component.css'],
})
export class GivetraineefeedbackComponent implements OnInit {
  //Course Name of the Course
  CourseName: string | any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private auth: LoginService,
    private userService: UserService
  ) {
    this.Traineename =
      this.router.getCurrentNavigation()?.extras.state?.['TraineeName'];
  }

  // Trainee Id to whom feedback is given
  traineeId!: number;
  // Trainee Name to whom feedback is given
  Traineename = '';

  // Trainer Id feedback is submitted by
  trainerId: any;
  // Course Id to which feedback is submitted
  courseId: any;

  deptId: any;

  //Page text settings
  txt = '';
  button = '';

  //Temporary storage for the user details
  temp: any;

  //Model for Trainee Feedback
  TraineeFeedback: any = {
    traineeId: '',
    trainerId: '',
    courseId: '',
    feedback: '',
  };

  //Component initialization
  ngOnInit(): void {
    this.traineeId = this.route.snapshot.params['traineeId'];
    this.courseId = this.route.snapshot.params['courseId'];
    this.trainerId = this.route.snapshot.params['trainerId'];
    this.CourseName = localStorage.getItem('courseName');
    if (this.traineeId != 0 && this.traineeId != null) {
      this.userService.getUsersById(this.traineeId).subscribe((res) => {
        this.temp = res;
        this.deptId = this.temp.departmentId;
      });
    } else {
      window.location.replace('/InvalidRequest');
    }
    this.setoption();
  }
  setoption() {
    if (
      this.trainerId != undefined &&
      this.courseId != 0 &&
      this.traineeId != 0
    ) {
      this.txt = 'Update';
      this.button = 'Update';
      this.http
        .get<any>(
          baseurl +
            'FeedBack/trainee/' +
            `${this.courseId}` +
            ',' +
            this.traineeId +
            ',' +
            this.trainerId
        )
        .subscribe({
          next: (res) => {
            this.TraineeFeedback = res;
          },
        });
    } else if (this.trainerId == undefined) {
      this.txt = 'Give';
      this.button = 'Submit';
    } else {
      window.location.replace('/PageNotFound');
    }
  }

  //Clicks Submit button
  OnSubmit() {
    if (this.trainerId == undefined) {
      this.TraineeFeedback.courseId = this.courseId;
      this.TraineeFeedback.traineeId = this.traineeId;
      this.TraineeFeedback.trainerId = this.auth.getId();
      this.http
        .post(baseurl + 'FeedBack/Trainee/feedback', this.TraineeFeedback)
        .subscribe((res) => {});
    } else {
      this.http
        .put(baseurl + 'FeedBack/Trainee/feedback', this.TraineeFeedback)
        .subscribe((res) => {});
    }
    window.location.replace(`CourseTrainees/${this.courseId}/${this.deptId}`);
  }
}
