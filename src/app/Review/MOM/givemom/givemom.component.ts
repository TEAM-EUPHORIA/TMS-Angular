import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  MOMId! :number;

  constructor(private reviewService: ReviewService, private route: ActivatedRoute) { }

  mom: any = {
    reviewId: '',
    statusId: '',
    traineeId: '',
    agenda: '',
    meetingNotes: '',
    purposeOfMeeting: ''
  };

  ngOnInit(): void {
    this.reviewId = this.route.snapshot.params['reviewId'];
    this.traineeId = this.route.snapshot.params['traineeId'];
    console.warn(this.reviewId + this.traineeId)
    if (this.MOMId != undefined && this.MOMId != null) {
      this.editMom();
    } else if (this.reviewId != undefined && this.reviewId != null) {
      this.uploadMOM();
    }
  }
  uploadMOM() {
    this.reviewService.getReviewById(this.reviewId).subscribe(res => {
      this.data = res;
      console.warn(this.data)
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