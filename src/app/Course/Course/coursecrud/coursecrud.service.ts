import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursecrudService {

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

}
