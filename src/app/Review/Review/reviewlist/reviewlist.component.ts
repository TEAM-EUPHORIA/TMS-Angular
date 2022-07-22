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
    this.getDepartments()
    this.statusId = this.router.url == '/Reviews' ? 1 : this.router.url == '/Completed-Review' ? 2 : this.router.url == '/Upcoming-Review' ? 1 : undefined
    console.log("status id :"+this.statusId)
    if (this.ls.IsCoordinator) {
      this.edit = true;
      console.log(this.edit)
      this.rs.getReviewByStatus(this.statusId).subscribe((res: any) => {
        this.changeReviewDateTime(res);
        this.reviewlist = res;
        this.reviewlist.forEach((element: any) => {
          element.department = this.dept.find((d: any) => d.id == element.departmentId)
        });
        this.reviewlistcopy = res;
        console.log(this.reviewlist.length > 0)
      })
    }
    if (this.ls.IsloggedIn) {
      this.edit = false;
      this.rs.getReviewByStatusAndUser(this.statusId, this.ls.getId()).subscribe((res: any) => {
        this.changeReviewDateTime(res)
        this.reviewlist = res;
        this.reviewlist.forEach((element: any) => {
          element.department = this.dept.find((d: any) => d.id == element.reviewer.departmentId)
          console.log(element.department)
        });
      })
    }
  }
  private changeReviewDateTime(res: any) {
    this.data = res;
    for (var item of this.data) {
      item.reviewTime = new Date(item.reviewTime);
      item.department = this.dept.find((department) => item.departmentId == department.id)
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
  filterByDepartment() {
    const item = document.getElementById("departmentId") as HTMLSelectElement
    if (item.value != '') {
      this.reviewlist = this.reviewlistcopy.filter(u => u.departmentId == item.value)
    } else {
      this.reviewlist = this.reviewlistcopy
    }
    this.updateCurrentPageAndTotalLength();
  }
  private updateCurrentPageAndTotalLength() {
    this.page = 1;
    this.totalLength = this.reviewlist.length;
  }
  filterByName() {
    const search = document.getElementById("search") as HTMLInputElement
    const item = document.getElementById("departmentId") as HTMLSelectElement
    if (item != null) {
      if (search.value != '' && item.value != '') {
        this.reviewlist = this.reviewlistcopy.filter((review: any) => review.trainee.fullName.toLowerCase().includes(search.value.toLowerCase()) && review.departmentId == item.value)
      } else if (search.value != '' && item.value == '') {
        this.reviewlist = this.reviewlistcopy.filter((user: any) => this.getFilteredUsers(user, search))
      } else if (search.value == '' && item.value != '') {
        this.reviewlist = this.reviewlistcopy.filter((user: any) => user.departmentId == item.value)
      } else if (search.value == '' && item.value == '') {
        this.reviewlist = this.reviewlistcopy
      }
    }
    else {
      if (search.value != '') {
        this.reviewlist = this.reviewlistcopy.filter((review: any) => this.getFilteredUsers(review, search))
      } else {
        this.reviewlist = this.reviewlistcopy
      }
    }
    this.updateCurrentPageAndTotalLength();
  }

  private getFilteredUsers(review: any, search: HTMLInputElement): any {
    return review.trainee.fullName.toLowerCase().includes(search.value.toLowerCase());
  }
}
