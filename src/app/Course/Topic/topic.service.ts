import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { baseurl } from 'src/app/URL';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private http: HttpClient) { }

  getAssignmentByCourseIdTopicIdAndOwnerId(cid: number, tid: number, oid: number): Observable<any> {
    var url = baseurl + "Course/" + `${cid}` + "/topics/" + `${tid}` + "/assignments/" + `${oid}`;
    return this.http.get<any>(url);
  }
  CreateTopic(data: any): Observable<any> {
    return this.http.post<any>(baseurl + "Course/topic", data)
  }
  UpdateTopic(data:any):Observable<any>{
    return this.http.put<any[]>(baseurl + "Course/topic",data);
  }
  getTopicByCourseIdTopicID(cid: number, tid: number): Observable<any[]> {
    var url = baseurl + "Course/" + `${cid}` + "/topics/" + `${tid}`;
    return this.http.get<any[]>(url);
  }
  GetTopicByCourseIdandTopicId(courseId : number,topicId : number): Observable<any>{
    return this.http.get<any>(baseurl + "Course/"+courseId+"/topics/"+ topicId);
  }
}
