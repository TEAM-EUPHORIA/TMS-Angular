import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }
  
  getAssignmentByCourseIdTopicIdAndOwnerId(cid: number, tid: number, oid: number): Observable<any> {
    var url = "https://localhost:5001/Course/" + `${cid}` + "/topics/" + `${tid}` + "/assignments/" + `${oid}`;
    return this.http.get<any>(url);
  }
  CreateTopic(data: any): Observable<any> {
    return this.http.post<any>("https://localhost:5001/Course/topic", data)
  }
  UpdateTopic(data:any):Observable<any>{
    return this.http.put<any[]>("https://localhost:5001/Course/topic",data);
  }
  getTopicByCourseIdTopicID(cid: number, tid: number): Observable<any[]> {
    var url = "https://localhost:5001/Course/" + `${cid}` + "/topics/" + `${tid}`;
    return this.http.get<any[]>(url)
  }
}
