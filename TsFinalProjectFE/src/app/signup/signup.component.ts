import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from '../service/user-service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['',  [ Validators.required , Validators.minLength(5)]],
      lastName: ['',  [ Validators.required , Validators.minLength(5)]],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required , Validators.minLength(5)]],
      role: ['USER', Validators.required],
      daysOff: [20, Validators.required] 
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error signing up:', error);
        }
      );
    }
  }
}
