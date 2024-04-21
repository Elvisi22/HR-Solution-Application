import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../service/timesheet-service/timesheet.service';
import { AuthService } from '../service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../service/toast/toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  timesheets: any[] = [];
  currentUserId: number | null = null;
  currentUser: any;
  timesheetForm!: FormGroup;
  today: Date = new Date();

  constructor(private timesheetService: TimesheetService , private router : Router,
    private authService : AuthService ,private formBuilder: FormBuilder,private _dialog : MatDialog,public snackBar: MatSnackBar ) {
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();
    this.timesheetForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      status: ['PENDING', Validators.required],
      note: ['', [Validators.required, Validators.maxLength(45)]],
      userId: [this.currentUser.id, [Validators.required, Validators.maxLength(45)]],
      createdBy:[this.currentUser.firstName, Validators.required]
    });
   }
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();
    this.currentUserId = this.authService.getCurrentUserFromLocalStorage()?.id;
    console.log(this.currentUserId);
    if (this.currentUserId) {
      this.getTimesheetsByUserId(this.currentUserId);
    }
  }
  getTimesheetsByUserId(userId: number): void {
    this.timesheetService.getTimesheetsByUserId(userId)
      .subscribe(timesheets => {
        this.timesheets = timesheets;
      });
  }
  onSubmit() {
    if (this.timesheetForm.valid) {
      this.timesheetService.createTimesheet(this.timesheetForm.value)
        .subscribe(
          response => {
            console.log('Timesheet created successfully:', response);
            this.snackBar.open('Timesheet created Successfuly', '', {
              duration: 1000,
              
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);           
          },
          error => {
            console.error('Error creating timesheet:', error);
            this.snackBar.open('Please choose different dates', '', {
              duration: 2000,
              
            });           
          }
        );
    }
  }
  navigateToUserTimesheets(id: number) {
    this.router.navigate(['tsh-edit', id]);
  }
  removeTimeSheet(id: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation ',
        message: 'Are you sure you want to delete this timesheet?'
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.timesheetService.removeTimeSheet(id)
      .subscribe(
        response => {
          console.log('TimeSheet deleted successfully:', response);
        },
        error => {
          console.error('Error deleting TimeSheet:', error);
        }
      );
      window.location.reload();
      }
    }); 
  }
}
