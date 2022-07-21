import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { DepartmentService } from 'src/app/Department/department.service';
import { LoginService } from 'src/app/Login/login.service';
import { UserService } from 'src/app/User/user.service';
import { ReviewService } from '../../review.service';
@Component({
  selector: 'app-reviewcrud',
  templateUrl: './reviewcrud.component.html',
  styleUrls: ['./reviewcrud.component.css']
})
export class ReviewcrudComponent implements OnInit {
  Users: any;
  dept: any = [];
  trainee: any;
  reviewer: any;
  reviewId !: number;
  departmentId !: number;
  Department !: string;
  Title !: string;
  constructor(private review: ReviewService, private dservice: DepartmentService, private route: ActivatedRoute, public datepipe: DatePipe, private auth: LoginService) { }
  StatusId = 1;
  errorMsg: any;
  Review: any = {
    id: 0,
    reviewerId: 0,
    statusId: 1,
    traineeId: 0,
    reviewDate: 0,
    reviewTime: 0,
    mode: '',
    isDisabled: false
  }

<<<<<<< HEAD
=======
    minDate:Date= new Date();
    maxDate:Date= new Date();

>>>>>>> 28f1bfbf515799331d5f66c2a8f1577223830970
  ngOnInit(): void {
    this.reviewId = this.route.snapshot.params['id'];
    this.GetallDepartment();
    if (this.reviewId == null) {
      this.Title = "Add";
    }
    else {
      this.Title = "Edit"
    }
    this.setoption();
  }
  setoption() {
    if (this.reviewId != null) {
      this.getReviewById();
    }
  }
  myFunction() {
    this.Review.reviewDate = this.datepipe.transform(this.Review.reviewDate, 'yyyy-MM-dd');
    this.Review.reviewTime = this.datepipe.transform(this.Review.reviewTime, 'HH:mm');
  }
  getReviewById() {
    this.review.getReviewById(this.reviewId).subscribe(res => {
      this.Review = res;
      this.departmentId = this.Review.reviewer.departmentId;
      this.myFunction();
    })
  }
  GetallDepartment() {
    this.dservice.getAllDepartment().subscribe(res => {
      this.dept = res
    })
  }
  OnSubmit() {
    if (this.reviewId) {
      this.review.putReview(this.Review).subscribe({
        next: (res: any) => {
          if(this.auth.IsCoordinator)
          {
            navigateToListPage('/ScheduledReview');
          }else{
            navigateToListPage('/Reviews');
          }
        },
        error(err) {
          console.warn(err["error"])
        },
      })
    }
    else {
      console.log(this.Review) // to be removed
      this.review.postReview(this.Review).subscribe({
        next: (res: any) => {
<<<<<<< HEAD
          if (this.auth.IsCoordinator) {
            navigateToListPage('/Scheduled-Reviews');
          } else {
=======
          if(this.auth.IsCoordinator)
          {
            navigateToListPage('/ScheduledReview');
          }else{
>>>>>>> 28f1bfbf515799331d5f66c2a8f1577223830970
            navigateToListPage('/Reviews');
          }
        },
        error(err: any) {
          console.warn(err["error"])
        },
      })
    }
  }
  OnSelected(): void {
    const departmentId = document.getElementById("departmentId") as HTMLSelectElement 
    this.GetReviewers(departmentId.value)
    this.GetTrainees(departmentId.value)
  }

  GetReviewers(dep: string) {
    this.review.GetUsersByDepartmentAndRole(dep, 5).subscribe(res => {
      this.reviewer = res
      console.log(res)
    });
  }
  GetTrainees(dsp: string) {
    this.review.GetUsersByDepartmentAndRole(dsp, 4).subscribe(res => {
      this.trainee = res
      console.log(res)
    });
  }
}
function navigateToListPage(url: string) {
  window.location.replace(url);
}
