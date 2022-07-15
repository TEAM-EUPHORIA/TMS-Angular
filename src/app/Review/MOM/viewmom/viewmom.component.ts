import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-viewmom',
  templateUrl: './viewmom.component.html',
  styleUrls: ['./viewmom.component.css']
})
export class ViewmomComponent implements OnInit {

  constructor(private reviewService: ReviewService,private route: Router, private activatedRoute: ActivatedRoute) 
  { this.momId = this.route.getCurrentNavigation()?.extras.state?.['obj']}
  reviewId!: number;
  traineeId!: number;
  id!: number;
  data: any;
  momId :any;
  ngOnInit(): void {
    // this.reviewId = this.activatedRoute.snapshot.params['reviewId'];
    // this.traineeId = this.activatedRoute.snapshot.params['traineeId'];
    this.getMom();
    this.reviewId = this.momId.reviewId;
    this.reviewId = this.momId.traineeId;
    console.log(this.reviewId, this.traineeId)
  }
  getMom() {
    this.reviewService.getMoMbyId(this.reviewId, this.traineeId).subscribe((res) => {
      this.data = res;
      console.log(this.data)
    });
  }

}
