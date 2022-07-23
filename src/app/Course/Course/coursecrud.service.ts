import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }
  baseurl = "https://localhost:5001/Course/"

  postcourse(data: any): Observable<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.baseurl + `course`, data)
}
putcourse(data: any): Observable<any> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8');
  return this.http.put<any>(this.baseurl + `course`, data)
}
getAllCourses(): Observable<any> {
  return this.http.get<any>(this.baseurl)
}
getCoursesByUserId(id: number): Observable<any> {
  return this.http.get<any>(this.baseurl + `users/${id}`);
}
disableCourse(id: number): Observable<any> {
  return this.http.delete<any>(this.baseurl + `disable/${id}`)
}
getCourse(id : number) : Observable<any>{
  return this.http.get<any>(this.baseurl + id);
}
disableTopic(id: number ,topicId: number): Observable<any> {
  return this.http.delete<any>(this.baseurl + `${id}/topics/disable/${topicId}`)
}
getTopicByCourseId(id : number) : Observable<any> {
  return this.http.get<any>(this.baseurl + `${id}/topics`)
}
}
