import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  private url = "http://localhost:8080/user"


  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/all`);
  }

  createUser(user: User): Observable<number> {
    return this.http.post<number>(`${this.url}/create`, user);
  }

  updateUser(id: number, userDTO: User): Observable<number> {
    return this.http.put<number>(`${this.url}/update/${id}`, userDTO);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  getUsersWithLatestTimesheets(): Observable<any> {
    return this.http.get<any[]>(`${this.url}/latest-timesheets`);
  }


}
