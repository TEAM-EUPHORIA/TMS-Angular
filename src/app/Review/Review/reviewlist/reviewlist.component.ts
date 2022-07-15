import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit {

  date!: Date;
  edit! : boolean;
  searchuser = ''
  page=1
  totalLength = 0
  data:any[]=[]
  title=''
  ReviewStatusId = 0
  Complete =true
  incomplete =true
  trainee : any;
    SearchActive(search: string) {
    this.searchuser = search;
  }
  constructor(public ls:LoginService,private rs:ReviewService,private route:ActivatedRoute, private router: Router) {
    
  }
  ngOnInit(): void {
    if(this.ls.IsCoordinator)
    {
      this.edit = true;
      this.route.params.subscribe(p => {
        this.rs.getReviewByStatus(p["reviewId"]).subscribe((res:any) =>{
          this.dateTime(res);
          console.warn(this.data)
        })
      })
    }
    if(this.ls.IsTrainee || this.ls.IsReviewer)
    {
      this.edit = false;
      this.route.params.subscribe(p => {
        this.rs.getReviewByStatusAndUser(p["reviewId"],this.ls.getId()).subscribe((res:any) =>{
          this.dateTime(res)
          this.data = res
        })
      })
    }
  }
  private dateTime(res: any) {
    this.data = res;
    this.date = new Date();
    for (var item of this.data) {
      item.reviewTime = new Date(item.reviewTime);
      console.warn(item.statusId);
    }
  }
  toViewMOM(id : number,tid : number){
    var obj : any = {
      reviewId : id,
      traineeId : tid
    }
    this.router.navigate(['/ViewMOM'],{state:{obj}});
  }
  toUploadMOM(id : number,tid : number){
    var obj : any = {
      reviewId : id,
      traineeId : tid
    }
    this.router.navigate(['/UploadMOM'],{state:{review : obj}});
  }
  disableReview(id: number) {
    this.rs.getReviewById(id).subscribe(res => {
      var data: any = res;
      data.statusId = 3;
      this.rs.putReview(data).subscribe(res => {
        this.rs.getReviewByStatus(this.ReviewStatusId).subscribe((res:any) => {
          this.data = res;
        })
      })
    })
  }
}