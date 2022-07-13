import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
// import { Department } from '../Models/Department';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  baseurl = "https://localhost:5001/Department/"

  getAllDepartment(): Observable<any[]> {
    return this.http.get<any[]>(this.baseurl + `departments`)
  }

  GetDepartmentById(id: number): Observable<any> {
    return this.http.get<any>(this.baseurl + id)
  }

  postdepartment(data: any): Observable<any> {
    console.warn(data);
    return this.http.post<any>(this.baseurl + `department`, data)
  }

  putdepartment(data: any): Observable<any> {
    console.warn(data);
    return this.http.put<any>(this.baseurl + `department`, data)
  }

  disableDepartment(id: number): Observable<any> {
    return this.http.delete<any>(this.baseurl + `disable/${id}`)
  }
}

