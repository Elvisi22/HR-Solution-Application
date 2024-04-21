import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { UserService } from '../service/user-service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit{
  editUserProfileForm!: FormGroup;
  userId!: number;
  user!: User;
  currentUser: any;
  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    public snackBar: MatSnackBar 
   
  ) {}

  ngOnInit(): void {
    
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();

    console.log(this.currentUser.firstName)

    this.initForm();
    
    console.log(this.currentUser.firstName)

    
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = +idParam;
      this.userService.getUserById(this.userId).subscribe((user: User) => {
        this.user = user;
        this.editUserProfileForm.patchValue(user);
      });
    } else {
      console.error('User ID not found in route parameters');
    }
  }

  initForm(): void {
  this.currentUser = this.authService.getCurrentUserFromLocalStorage(); 
  this.editUserProfileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],

  });

    
  }

  onEditSubmit(): void {
    if (this.editUserProfileForm.valid) {
      const updatedUser: User = this.editUserProfileForm.value;
      updatedUser.modifiedBy = this.currentUser.userName;
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (response: any) => {
          console.log('User updated successfully:', response);
          this.snackBar.open(' Profile updated successfully', '', {
            duration: 2000,       
          });

          if(this.currentUser.role === 'MANAGER'){
            this.router.navigate(['user-list']);
          }else{
            this.router.navigate(['user-view']);
          }          
        },
        (error: any) => {
          console.error('Error updating user:', error);                
        }
      );
    }
  }
}
