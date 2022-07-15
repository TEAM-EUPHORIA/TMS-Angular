import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  LoginService
} from 'src/app/Login/login.service';
import {
  baseurl
} from 'src/app/URL';
import {
  ReviewService
} from '../../review.service';
@Component({
  selector: 'app-reviewlist',
  templateUrl: './reviewlist.component.html',
  styleUrls: ['./reviewlist.component.css']
})
export class ReviewlistComponent implements OnInit {
  pageTitle = ''
  edit: boolean = false;
  data: any[] = [];
  searchuser: string = '';
  date: Date = new Date();
  statusId: any;
  dept: any[] = [];
  _dept = ''
  page = 1
  totalLength = 1
  SearchActive(search: string) {
    this.searchuser = search;
  }
  constructor(public ls: LoginService, private rs: ReviewService, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.pageTitle = this.router.url.slice(1)
    this.getDepartments()
    this.statusId = this.router.url == '/Upcoming-Review' ? 1 : this.router.url == '/Completed-Review' ? 2 : undefined
    console.log(this.statusId)
    if (this.ls.IsCoordinator) {
      this.edit = true;
      this.rs.getReviewByStatus(this.statusId).subscribe((res: any) => {
        this.changeReviewDateTime(res);
        console.log(this.data)
      })
    }
    if (this.ls.IsTrainee || this.ls.IsReviewer) {
      this.edit = false;
      this.rs.getReviewByStatusAndUser(this.statusId, this.ls.getId()).subscribe((res: any) => {
        this.changeReviewDateTime(res)
        console.log(this.data)
      })
    }
  }
  private changeReviewDateTime(res: any) {
    this.data = res;
    for (var item of this.data) {
      item.reviewTime = new Date(item.reviewTime);
      console.warn(item.statusId);
    }
    this.totalLength = this.data.length
  }
  disableReview(id: number) {
    this.rs.getReviewById(id).subscribe(res => {
      var data: any = res;
      data.statusId = 3;
      this.rs.putReview(data).subscribe(res => {
        this.rs.getReviewByStatus(this.statusId).subscribe((res: any) => {
          this.changeReviewDateTime(res)
        })
      })
    })
  }
  getDepartments() {
    this.http.get(baseurl + `Department/departments`).subscribe((res: any) => {
      this.dept = res
    })
  }
}
