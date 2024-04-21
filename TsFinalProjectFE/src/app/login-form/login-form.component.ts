import { Component } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm!: FormGroup;


  constructor(private formBuilder: FormBuilder 
    ,private authService: AuthService,
    public snackBar: MatSnackBar,
    
    private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login(): void {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.authService.login(userName, password).subscribe(
        response => {          
          console.log('Login successful:', response);         
          this.authService.saveUserToLocalStorage(response);          
          if (this.authService.isAdmin()) {
            this.router.navigate(['/user-list']); 
          } else {
            this.router.navigate(['/user-view']); 
          }          
        },
        error => {         
          console.error('Login failed:', error);
          this.snackBar.open('Email or password are incorrect', '', {
            duration: 1500,           
          });
        }
      );
    }
  }
}
