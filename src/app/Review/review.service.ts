import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { baseurl } from '../URL';
// import { ReviewDTO } from '../Models/ReviewDTO';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  baseurl = baseurl + "Review/";

  getReviewByStatusAndUser(statusId: number, userId: number): Observable<any> {
    return this.http.get<any>(this.baseurl + `review/status/${statusId},${userId}`)
  }
  getReviewById(id: any): Observable<any[]> {
    return this.http.get<any>(this.baseurl + `${id}`)
  }
  getReviewByStatus(statusId: any): Observable<any[]> {
    return this.http.get<any>(this.baseurl + `review/status/${statusId}`)
  }
  GetUsersByDepartmentAndRole(deptid: any, roleid: any): Observable<any> {
    return this.http.get<any>(baseurl + "User/GetUsersByDepartmentAndRole/" + `${deptid},${roleid}`)
  }
  postReview(data: any): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.baseurl + `review`, data)
  }


  putReview(data: any): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.put<any>(this.baseurl + `review`, data)
  }
  getMoMbyId(Revieweid: string, Traineeid: string): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log(Revieweid, Traineeid);
    return this.http.get<any>(this.baseurl + `mom/${Revieweid},${Traineeid}`);
  }
  CreateMOM(data: any): Observable<any> {
    return this.http.post<any>(this.baseurl + `mom`, data)
  }
  PutMOM(data: any): Observable<any> {
    return this.http.put<any>(this.baseurl + `mom`, data)
  }
}
