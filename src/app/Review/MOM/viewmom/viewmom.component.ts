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
    this.reviewId = this.momId.reviewId;
    this.traineeId = this.momId.traineeId;
    this.getMom(this.reviewId, this.traineeId);
  }
  toEditMOM(){
    console.warn(this.data);
    this.route.navigate(['/EditMOM'],{state:{mom : this.data}});
  }
  getMom(reviewId : number, traineeId:number) {
    this.reviewService.getMoMbyId(reviewId, traineeId).subscribe((res) => {
      this.data = res;
      console.log(this.data)
    });
  }

}
