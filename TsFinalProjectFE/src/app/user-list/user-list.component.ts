import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { AuthService } from '../service/auth/auth.service';
import { TimesheetService } from '../service/timesheet-service/timesheet.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterUsersDialogComponent } from '../filter-users-dialog/filter-users-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  users: any[] = [];
  currentUser: any;
  timesheets: any[] = [];
  searchQuery: string = '';

  constructor(private userService: UserService, private _dialog : MatDialog ,
    private authService: AuthService ,private timesheetService: TimesheetService,private router: Router ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();
  }

  getAllUsersByTimesheet() {
    this.userService.getUsersWithLatestTimesheets()
      .subscribe(
        (response: any[]) => {
          this.users = response;
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
  }

  getAllUsers() {
    this.userService.getAllUsers()
      .subscribe(
        (response: any[]) => {
          this.users = response;
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );
  }

  navigateToUserTimesheets(userId: number) {
    this.router.navigate(['tsh-view', userId]);
  }

  navigateToEditUserProfile(userId : number){
    this.router.navigate(['edit-profile', userId]);
  }


  filterUsers() {
    const dialogRef = this._dialog.open(FilterUsersDialogComponent , {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'all') {
        this.getAllUsers();
      } else if (result == 'latestRequests') {
        this.getAllUsersByTimesheet();
      }
    });
  }
  

  deleteUserProfile(userId:number){
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation ',
        message: 'Are you sure you want to delete this contact?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(
          response => {
            console.log('User deleted successfully:', response);
            
          },
          error => {
            console.error('Error deleting user:', error);
            
          }
        );
        window.location.reload();
      }
    });   
}
  searchUsers(query: string) {
    this.searchQuery = query; 
  }
}
