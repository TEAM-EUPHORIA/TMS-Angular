import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private _course: any = {};
  public get course(): any {
    return this._course;
  }
  public set course(value: any) {
    this._course = value;
  }

  constructor(private http: HttpClient) { }
  baseurl = "https://localhost:5001/Course/"

  postcourse(data: any): Observable<any> {
    return this.http.post<any>(this.baseurl + `course`, data)
  }
  putcourse(data: any): Observable<any> {
    return this.http.put<any>(this.baseurl + `course`, data)
  }
  getAllCourses(): Observable<any> {
    return this.http.get<any>(this.baseurl)
  }
  getCourseByCourseForTraineeTrainer(): Observable<any> {
    return this.http.get<any>(this.baseurl + `myCourses`);
  }
  getCourseById(cid:any): Observable<any> {
    return this.http.get<any>(this.baseurl + `${cid}`);
  }
  getCoursesByUserId(id: number): Observable<any> {
    return this.http.get<any>(this.baseurl + `users/${id}`);
  }
  disableCourse(id: number): Observable<any> {
    return this.http.delete<any>(this.baseurl + `disable/${id}`)
  }
  disableTopic(id: number, topicId: number): Observable<any> {
    return this.http.delete<any>(this.baseurl + `${id}/topics/disable/${topicId}`)
  }
  getTopicByCourseId(id: number): Observable<any> {
    return this.http.get<any>(this.baseurl + `${id}/topics`)
  }
  getCourse(id : number) : Observable<any>{
    return this.http.get<any>(this.baseurl + id);
  }
}
