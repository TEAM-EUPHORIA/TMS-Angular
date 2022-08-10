import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { baseurl } from 'src/app/URL';
import { ReviewService } from '../../review.service';
@Component({
  selector: 'app-givemom',
  templateUrl: './givemom.component.html',
  styleUrls: ['./givemom.component.css']
})
export class GivemomComponent implements OnInit {
  date: Date = new Date();
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
  pageTitle = 'Review Details'
  showBtn = true
  constructor(private reviewService: ReviewService, private router: Router, private route: ActivatedRoute, private http: HttpClient, public ls: LoginService) { }
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
  showMom(event$: HTMLDivElement) {
    var btn = event$
    if (btn.innerText == "Upload MOM") {
      btn.classList.toggle('d-none')
      this.pageTitle = "Upload Mom for Review"
    }
    this.toggleDisplayNone();
  }
  private toggleDisplayNone() {
    var ele = document.getElementById("mom");
    ele?.classList.toggle('d-none');
  }

  ngOnInit(): void {
    var temp = this.router.url.split('/')
    this.reviewId = this.route.snapshot.params["reviewId"]
    console.log(temp)
    console.warn(this.traineeId != 'Add')
    this.reviewId = temp[2]
    this.traineeId = temp[3]
    if (this.reviewId != undefined && this.traineeId != undefined) {
      this.editMom();
    } else if (this.reviewId != undefined) {
      console.warn(this.reviewId, this.traineeId)
      this.uploadMOM();
    }
  }

  uploadMOM() {
    this.reviewService.getReviewById(this.reviewId).subscribe(res => {
      console.log(this.mom)
      this.data = res;
      this.data.reviewTime = new Date(this.data.reviewTime)
      console.log(this.ls.IsTrainee && (this.date.getTime() > this.data.reviewTime.getTime()))
    })
  }
  editMom() {
    this.reviewService.getReviewById(this.reviewId).subscribe(res => {
      console.log(this.traineeId)
      this.data = res;
      this.reviewId = this.data.id;
      this.reviewerName = this.data.reviewer.fullName;
      this.reviewMode = this.data.mode;
      this.reviewDate = this.data.reviewDate;
      this.reviewTime = this.data.reviewTime;
      this.data.reviewTime = new Date(this.data.reviewTime)
      console.log(this.data.reviewTime.getTime())
      this.showBtn = (this.date.getTime() > this.data.reviewTime.getTime() && this.ls.IsTrainee) && (this.data.statusId != 2) && (this.ls.IsTrainee);
      this.reviewService.getMoMbyId(this.reviewId, this.traineeId).subscribe(result => {
        this.mom = result;
        console.warn(this.mom)
      })
    })
  }
  private navigateToListPage() {
    window.location.replace(`/Review/${this.reviewId}/MOM/${this.ls.getId()}`)
  }
  OnSubmit() {
    this.http.get(baseurl + `Review/mom/${this.reviewId},${this.traineeId}`).subscribe({
      next: (res: any) => {
        this.reviewService.PutMOM(this.mom).subscribe(res => {
          this.navigateToListPage();
        })
      },
      error: (err: any) => {
        this.mom.traineeId = this.ls.getId();
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
