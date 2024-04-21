import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service/user.service';
import { AuthService } from '../service/auth/auth.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  signupForm!: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();

    console.log(this.currentUser.firstName);

    this.signupForm = this.formBuilder.group({
      firstName: ['', [ Validators.required , Validators.minLength(5)]],
      lastName: ['', [ Validators.required , Validators.minLength(5)]],
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required , Validators.minLength(5)]],
      role: ['USER', Validators.required],
      daysOff: [20, Validators.required] ,
      createdBy : [this.currentUser.userName]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.userService.createUser(this.signupForm.value).subscribe(
        () => {
          this.router.navigate(['/user-list']);
        },
        error => {
          console.error('Error signing up:', error);
        }
      );
    }
  }
}
