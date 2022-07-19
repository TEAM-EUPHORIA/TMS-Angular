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
  review: any;
  reviewlist: any[] = [];
  reviewlistcopy: any[] = [];
  SearchActive(search: string) {
    this.searchuser = search;
  }
  constructor(public ls: LoginService, private rs: ReviewService, private router: Router, private http: HttpClient) {
  }
  ngOnInit(): void {
    this.pageTitle = this.router.url.slice(1)
    console.warn(this.router.url)
    this.getDepartments()
    this.statusId = this.router.url == '/Upcoming-Review' ? 1 : this.router.url == '/Completed-Review' ? 2 : undefined
    console.log(this.statusId)
    if (this.ls.IsCoordinator) {
      this.edit = true;
      this.rs.getReviewByStatus(this.statusId).subscribe((res: any) => {
        this.changeReviewDateTime(res);
        this.reviewlist = res;
        this.reviewlistcopy = res;
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
      item.department = this.dept.find((department) => item.departmentId == department.id)
      console.warn(this.dept);
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
  filterByDepartment(item: HTMLSelectElement) {
    console.log(item)
    if (item.value != '') {
      this.reviewlist = this.reviewlistcopy.filter(u => u.departmentId == item.value)
      this.updateCurrentPageAndTotalLength();
    } else {
      this.reviewlist = this.reviewlistcopy
      this.updateCurrentPageAndTotalLength();
    }
  }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.reviewlist.length;
  }
  filterByName(search: HTMLInputElement) {
    const dropdown = document.getElementById("departmentId")! as HTMLSelectElement
    dropdown.value = ""
    if (search.value != '') {
      console.log(this.reviewlist)
      this.reviewlist = this.reviewlistcopy.filter((review: any) => review.trainee.fullName.toLowerCase().includes(search.value.toLowerCase()))
      this.updateCurrentPageAndTotalLength();
    } else {
      this.reviewlist = this.reviewlistcopy
      this.updateCurrentPageAndTotalLength();
      dropdown.disabled = false
    }
  }
}
