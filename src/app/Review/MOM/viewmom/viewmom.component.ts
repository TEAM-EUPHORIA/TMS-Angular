import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-viewmom',
  templateUrl: './viewmom.component.html',
  styleUrls: ['./viewmom.component.css']
})
export class ViewmomComponent implements OnInit {
  reviewId: string = '';
  traineeId: string = '';

  constructor(private reviewService: ReviewService,private route: Router,public ls:LoginService) 
  { this.momId = this.route.getCurrentNavigation()?.extras.state?.['obj']}

  id!: number;
  data: any;
  momId :any;
  ngOnInit(): void {
    var ids = this.route.url.split('/')
    this.reviewId = ids[2]
    this.traineeId = ids[4]
    this.getMom(this.reviewId, this.traineeId);
  }
  toEditMOM(){
    console.warn(this.data);
    this.route.navigate(['/EditMOM'],{state:{mom : this.data}});
  }
  getMom(reviewId : string, traineeId:string) {
    this.reviewService.getMoMbyId(reviewId, traineeId).subscribe((res) => {
      this.data = res;
      console.log(this.data)
    });
  }

}
