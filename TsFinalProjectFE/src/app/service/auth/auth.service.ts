import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080'; 
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    const body = { userName, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body);
  }
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
  saveUserToLocalStorage(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  getCurrentUserFromLocalStorage(): any {
    const userJson = localStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }
  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return !!user; 
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'MANAGER';
  }
}
