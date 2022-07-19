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
  showBtn= true
  constructor(private reviewService: ReviewService, private router: Router, private http: HttpClient,public ls:LoginService) { }
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
  showMom(event$:HTMLDivElement){
    var btn = event$
    if(btn.innerText == "Upload")
    {
      btn.innerText = "Hide Mom"
      this.pageTitle = "Upload Mom for Review"
    }
    else 
    {
      btn.innerText = "Upload"
      this.pageTitle = "Review Details"
    }
    this.toggleDisplayNone();
  }
  private toggleDisplayNone() {
    var ele = document.getElementById("mom");
    ele?.classList.toggle('d-none');
  }

  ngOnInit(): void {
    var temp = this.router.url.split('/')
    console.log(temp)
    this.reviewId = temp[2]
    this.traineeId = temp[3]
    console.warn(this.reviewId,this.traineeId)
    if (this.reviewId != undefined && this.traineeId != undefined) {
      this.editMom();
    } else if (this.reviewId != undefined) {
      console.warn(this.reviewId ,this.traineeId)      
      this.uploadMOM();
    }
    this.showOrHideBtn(temp);
  }
  private showOrHideBtn(temp: string[]) {
    if (temp.length == 3) {
      if(temp[1] == 'UploadMOM')
      {
        this.pageTitle = "Review Details"
      }
      else
      {
        console.warn("else")
        this.pageTitle = "Edit Mom for Review"
        this.toggleDisplayNone()
        this.showBtn = false
      }
    }
    else if (temp.length == 4) {
      this.showBtn = false;
      this.pageTitle = "Edit Mom for Review"
      this.toggleDisplayNone()
    }
  }

  uploadMOM() {
    console.log(this.reviewId)
    this.reviewService.getReviewById(this.reviewId).subscribe(res => {
      this.data = res;
      this.data.reviewTime = new Date(this.data.reviewTime)
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
      // this.traineeId = this.data.traineeId;
      this.showBtn = (this.date.getTime() > this.data.reviewTime.getTime() && this.ls.IsTrainee) && (this.data.statusId != 2) && (this.ls.IsTrainee);
      this.reviewService.getMoMbyId(this.reviewId, this.traineeId).subscribe(result => {
        this.mom = result;
        console.warn(this.mom)
      })
    })
  }
  private navigateToListPage() {
    window.location.replace(`/ViewMOM/${this.reviewId},${this.traineeId}`)
  }
  OnSubmit() {
    this.http.get(baseurl + `Review/mom/${this.reviewId},${this.traineeId}`).subscribe({
      next: (res: any) => {
        this.reviewService.PutMOM(this.mom).subscribe(res => {
          this.navigateToListPage();
        })
      },
      error: (err: any) => {
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