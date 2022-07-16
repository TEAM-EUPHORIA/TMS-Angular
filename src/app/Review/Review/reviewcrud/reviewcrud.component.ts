import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { DepartmentService } from 'src/app/Department/department.service';
import { UserService } from 'src/app/User/user.service';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-reviewcrud',
  templateUrl: './reviewcrud.component.html',
  styleUrls: ['./reviewcrud.component.css']
})
export class ReviewcrudComponent implements OnInit {

  User: any;
  Users: any;
  dept: any;
  trainee: any;
  reviewer: any;
  deptId !: number;
  reviewId !: number;

  departmentId !: number;
  Department !: string;
  Title !: string;

  constructor(private review: ReviewService, private dservice: DepartmentService, private route: ActivatedRoute, public datepipe: DatePipe) { }

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
  ngOnInit(): void {
    this.reviewId = this.route.snapshot.params['id'];
    console.log(this.reviewId)
    this.GetallDepartment();
    console.warn(this.reviewId);
    if (this.reviewId == null) {
      this.Title = "Add";
    }
    else {
      this.Title = "Edit"
    }
    this.setoption();
  }
  setoption(form?: NgForm) {
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
      console.log(res)
      this.myFunction();
      this.Click()
    })
  }
  GetallDepartment() {
    this.dservice.getAllDepartment().subscribe(res => {
      this.dept = res
      this.deptId = this.dept.id;
    })
  }

  OnSubmit() {
    if (this.reviewId) {
      this.review.putReview(this.Review).subscribe({
        next: (res: any) => {
          navigateToListPage('/Completed-Review');
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
          navigateToListPage("/Upcoming-Review");
          console.warn(res)
        },
        error(err: any) {
          console.warn(err["error"])
        },
      })
    }
  }
  OnSelected(): void {
    this.Review.departmentId
    this.dept.departmentId;
    console.warn()
    this.deptId = Number.parseInt(this.Review.departmentId);
    this.GetUsersByDepartmentAndRole_Reviewer(this.deptId);
    this.GetUsersByDepartmentAndRole_Trainee(this.deptId);
    this.Selecteddept.emit(this.Department);
  }

  @Output()
  Selecteddept: EventEmitter<string> = new EventEmitter<string>();

  Click() {
    this.GetUsersByDepartmentAndRole_Reviewer(this.departmentId);
    this.GetUsersByDepartmentAndRole_Trainee(this.departmentId);
  }

  GetUsersByDepartmentAndRole_Reviewer(dep: number) {
    this.review.GetUsersByDepartmentAndRole(dep, 5).subscribe(res => {
      this.reviewer = res
    });
  }
  GetUsersByDepartmentAndRole_Trainee(dsp: number) {
    this.review.GetUsersByDepartmentAndRole(dsp, 4).subscribe(res => {
      this.trainee = res
    });
  }
}

function navigateToListPage(url: string) {
  window.location.replace(url);
}

