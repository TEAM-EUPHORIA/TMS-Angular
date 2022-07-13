import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit {

  constructor(private reviewService: ReviewService, private route: ActivatedRoute, public logIn: LoginService, private auth: LoginService) { }
  data: any;
  ReviewStatusId !: number;
  review: any;
  roleid: number = this.auth.getRoleId();
  page: number = 1;
  totalLength: any;
  Editable: boolean = false;
  Complete: boolean = false;
  incomplete : boolean = false;
  add: boolean = false;

  searchuser !: string;
  title !: string;

  ngOnInit(): void {
    this.getReviewByStatus();
    this.ReviewStatusId = this.route.snapshot.params['reviewId']
    this.route.params.subscribe(p => {
      this.reviewService.getReviewByStatus(p["reviewId"]).subscribe(res => {
        this.data = res;
        this.ReviewStatusId = p["reviewId"];
        if (this.ReviewStatusId == 1 && this.roleid == 2) {
          console.info("",this.ReviewStatusId)
          this.Editable = true;
          this.title = "Upcoming Review";
          this.add = true;
          this.Complete = false;
        } else if (this.ReviewStatusId == 2) {
          this.Editable = false;
          this.Complete = true;
          this.incomplete = true;
          this.title = "Completed Review";
          this.add = false;
        } else {
          this.Complete = false;
          this.Editable = false;
          this.title = "Canceled Review";
        }
        console.warn(this.title,`edit :${this.Editable}, completed: ${this.Complete},add: ${this.add}`)
      })
    })

  }
  SearchActive(search: string) {
    this.searchuser = search;
  }

  getReviewByStatus() {
    this.reviewService.getReviewByStatus(this.ReviewStatusId).subscribe(res => {
      this.data = res
    })
  }

  disableReview(id: number) {
    this.reviewService.getReviewById(id).subscribe(res => {
      var data: any = res;
      data.statusId = 3;
      this.reviewService.putReview(data).subscribe(res => {
        this.reviewService.getReviewByStatus(this.ReviewStatusId).subscribe(res => {
          this.data = res;
        })
      })
    })
  }
}