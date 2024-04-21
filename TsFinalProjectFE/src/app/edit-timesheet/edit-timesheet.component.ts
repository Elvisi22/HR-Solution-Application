import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSheetDTO } from 'src/model/TimeSheetDTO';
import { TimesheetService } from '../service/timesheet-service/timesheet.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss']
})
export class EditTimesheetComponent implements OnInit{
  editTimesheetForm!: FormGroup;
  timesheetId!: number;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
    private router : Router,
    public snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUserFromLocalStorage();

    this.initForm();
    // Get the timesheet ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      // Convert the ID parameter to a number
      this.timesheetId = +idParam;
      // Fetch the timesheet details and populate the form
      this.timesheetService.getTimesheetById(this.timesheetId).subscribe(
        timesheet => {
          this.editTimesheetForm.patchValue(timesheet); // Patch the timesheet data into the form
        },
        error => {
          console.error('Error fetching timesheet details:', error);
        }
      );
    } else {
      console.error('Timesheet ID not found in route parameters');
    }
  }

  initForm(): void {
    this.editTimesheetForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      status: ['', Validators.required],
      note: ['']
    });
  }
  
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role === 'MANAGER';
  }

  onEditSubmit(): void {
    if (this.editTimesheetForm.valid) {

      const updatedTimesheetDTO: TimeSheetDTO = this.editTimesheetForm.value;
      updatedTimesheetDTO.modifiedBy = this.currentUser.userName;
      if(this.currentUser.role === 'USER'){
        this.timesheetService.updateTimesheetbyUser(this.timesheetId, updatedTimesheetDTO).subscribe(
          response => {
            console.log('Timesheet updated successfully:', response);
            this.snackBar.open('Timesheet response was sent', '', {
              duration: 1000,
              
            });
            this.router.navigate(['user-view']);
          },
          error => {
            console.error('Error updating timesheet:', error);
          }
        );
      }

      this.timesheetService.updateTimesheet(this.timesheetId, updatedTimesheetDTO).subscribe(
        response => {
          console.log('Timesheet updated successfully:', response);
          this.snackBar.open('Timesheet response was sent', '', {
            duration: 1000,
            
          });
          this.router.navigate(['user-list']);
        },
        error => {
          console.error('Error updating timesheet:', error);
        }
      );
    }
  }
}
