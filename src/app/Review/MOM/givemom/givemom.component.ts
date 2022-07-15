import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-givemom',
  templateUrl: './givemom.component.html',
  styleUrls: ['./givemom.component.css']
})
export class GivemomComponent implements OnInit {

  data: any;
  reviewId! : number;
  reviewerName = '';
  reviewDate = '';
  reviewTime = '';
  reviewMode = '';
  traineeId! : number;
  OwnerId = null;
  StatusId = 2;
  MOM : any;
  MOMId! :number;
  momDetails : any;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute, private router : Router)
  {this.momDetails = this.router.getCurrentNavigation()?.extras.state?.['review'], this.MOM = this.router.getCurrentNavigation()?.extras.state?.['mom'] }

  mom: any = {
    reviewId: '',
    statusId: '',
    traineeId: '',
    agenda: '',
    meetingNotes: '',
    purposeOfMeeting: ''
  };

  ngOnInit(): void {
    console.warn(this.momDetails);
    // this.reviewId = this.route.snapshot.params['reviewId'];
    // this.traineeId = this.route.snapshot.params['traineeId'];
    this.reviewId = this.momDetails.reviewId;
    this.traineeId = this.momDetails.traineeId;
    console.warn(this.reviewId , this.traineeId)
    console.warn(this.traineeId)
    if (this.traineeId != undefined && this.traineeId != null) {
      this.editMom();
    } else if (this.reviewId != undefined && this.reviewId != null) {
      this.uploadMOM();
    }
  }
  uploadMOM() {
    this.reviewService.getReviewById(this.reviewId).subscribe(res => {
      this.data = res;
      console.warn(this.reviewId)
    })
  }
  editMom() {
    this.reviewService.getReviewById(this.traineeId).subscribe(res => {
      this.data = res;
      console.warn(this.data);
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

  OnSubmit() {
    if (this.MOMId != undefined && this.MOMId != null) {
      this.reviewService.PutMOM(this.mom).subscribe(res => {
      })
    } else if (this.reviewId != undefined && this.reviewId != null) {
      this.mom.traineeId = this.traineeId;
      this.reviewService.CreateMOM(this.mom).subscribe((res) => {
      })
    }
  }
}