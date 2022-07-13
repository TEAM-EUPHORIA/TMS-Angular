import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseurl = "https://localhost:5001/User/"

  getAllUsersByRoleId(id: number): Observable<UserService[]> {
    return this.http.get<UserService[]>(this.baseurl + `role/${id}`)
  }
  getUsersByDepartmentIdAndRoleId(did: number, rid: number): Observable<UserService[]> {
    return this.http.get<UserService[]>(this.baseurl + `GetUsersByDepartmentAndRole/${did},${rid}`)
  }
  getUsersById(id: number) {
    return this.http.get(this.baseurl + `${id}`);
  }
  getAllUsersByRole(id: number): Observable<any> {
    return this.http.get<any>(this.baseurl + `role/${id}`)
  }
  postUser(data: any): Observable<any> {
    return this.http.post<any>(this.baseurl + 'user', data);
  }
  updateUser(data: any): Observable<any> {
    return this.http.put<any>(this.baseurl + 'user', data);
  }
  disableUser(id: number): Observable<any> {
    return this.http.delete<any>(this.baseurl + `disable/${id}`);
  }


}