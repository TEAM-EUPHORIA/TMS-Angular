import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-view',
  templateUrl: './review-view.component.html',
  styleUrls: ['./review-view.component.css']
})
export class ReviewViewComponent implements OnInit {
  pageTitle = 'Review Details'
  data: any = {};
  reviewId: any;
  date: any;
  navLink!: string;
  constructor(private route: ActivatedRoute, private reviewService: ReviewService, public ls: LoginService) { }

  ngOnInit(): void {
    this.reviewId = this.route.snapshot.params["reviewId"]
    this.reviewService.getReviewById(this.reviewId).subscribe(res => {
      this.data = res;
      if(this.data.statusId == 1 && this.ls.IsCoordinator){
        this.navLink = 'Schedule-Reviews'
      }else if(this.data.statusId == 1){
        this.navLink = 'Reviews'
      }
      else if(this.data.statusId == 2 && this.ls.IsCoordinator){
        this.navLink = 'Completed-Reviews'
      }else if(this.data.statusId == 2){
        this.navLink = 'Reviews'
      }
      this.pageTitle = 'Review Details'
      this.data.reviewTime = new Date(this.data.reviewTime)
      console.log(this.data)
      this.reviewService.getMoMbyId(this.data.id, this.data.traineeId).subscribe((res) => {
        this.data.mom = res;
        console.log(this.data)
      });
    })
  }
}
