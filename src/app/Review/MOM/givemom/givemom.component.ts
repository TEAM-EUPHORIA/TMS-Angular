import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { baseurl } from 'src/app/URL';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-givemom',
  templateUrl: './givemom.component.html',
  styleUrls: ['./givemom.component.css']
})
export class GivemomComponent implements OnInit {

  data: any;
  reviewId = '';
  reviewerName = '';
  reviewDate = '';
  reviewTime = '';
  reviewMode = '';
  traineeId = '';
  OwnerId = null;
  StatusId = 2;
  MOM: any;
  MOMId!: number;
  momDetails: any;

  constructor(private reviewService: ReviewService, private router: Router, private http: HttpClient) { }
  momForm = new FormGroup({
    agenda: new FormControl('', [
      Validators.required
    ]),
    meetingNotes: new FormControl('', [
      Validators.required
    ]),
    purposeOfMeeting: new FormControl('', [
      Validators.required
    ]),
  })

  mom: any = {
    reviewId: '',
    statusId: '',
    traineeId: '',
    agenda: '',
    meetingNotes: '',
    purposeOfMeeting: ''
  };

  ngOnInit(): void {
    var temp = this.router.url.split('/')
    this.reviewId = temp[1]
    this.traineeId = temp[2]
    if (this.traineeId != undefined && this.traineeId != null) {
      this.editMom();
    } else if (this.reviewId != undefined && this.reviewId != null) {
      this.uploadMOM();
    }
  }
  uploadMOM() {
    console.log(this.reviewId)
    this.reviewService.getReviewById(this.reviewId).subscribe(res => {
      this.data = res;
      console.warn(this.data)
    })
  }
  editMom() {
    this.reviewService.getReviewById(this.traineeId).subscribe(res => {
      this.data = res;
      this.reviewId = this.data.id;
      this.reviewerName = this.data.reviewer.fullName;
      this.reviewMode = this.data.mode;
      this.reviewDate = this.data.reviewDate;
      this.reviewTime = this.data.reviewTime;
      this.traineeId = this.data.traineeId;
      this.reviewService.getMoMbyId(this.reviewId, this.traineeId).subscribe(result => {
        this.mom = result;
      })
    })
  }
  private navigateToListPage() {
    window.location.replace('/Completed-Review')
  }
  OnSubmit() {
    let mom: any;
    this.http.get(baseurl + `Review/mom/${this.reviewId},${this.traineeId}`).subscribe((res) => {
      mom = res
      if (mom) {
        this.reviewService.PutMOM(this.mom).subscribe(res => {
          this.navigateToListPage();
        })
      } else {
        this.mom.traineeId = this.traineeId;
        this.mom.reviewId = this.reviewId;
        this.mom.statusId = 1
        console.warn(this.mom)
        this.reviewService.CreateMOM(this.mom).subscribe((res) => {
          this.navigateToListPage();
        })
      }
    })
  }
}