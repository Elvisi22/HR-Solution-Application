import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  
  constructor(private authService: AuthService , private route : Router) { }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['./login'])
  }
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'MANAGER';
  }
  isLoggedIn(): boolean {
    
    return this.authService.isLoggedIn();
  }
  profile(){
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.route.navigate(['./edit-profile/' , user.id])
  }

  

}
