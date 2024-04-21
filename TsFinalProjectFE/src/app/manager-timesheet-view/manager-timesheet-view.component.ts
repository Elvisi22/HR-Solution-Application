import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../service/timesheet-service/timesheet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSheetDTO } from 'src/model/TimeSheetDTO';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-manager-timesheet-view',
  templateUrl: './manager-timesheet-view.component.html',
  styleUrls: ['./manager-timesheet-view.component.scss']
})
export class ManagerTimesheetViewComponent implements OnInit{
  timesheets: any[] = [];
  timesheetForm!: FormGroup;
  userId!: number;
  

  
  constructor(private timesheetService: TimesheetService , private authService : AuthService ,
    private formBuilder: FormBuilder ,private route: ActivatedRoute,private router: Router ,private _dialog : MatDialog) {
    
    this.timesheetForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      status: ['PENDING', Validators.required],
      note: ['', [Validators.required, Validators.maxLength(45)]],
      userId: ['', [Validators.required, Validators.maxLength(45)]],
      createdBy:['', Validators.required]
    });
   }

   ngOnInit(): void {
    
    const userIdParam = this.route.snapshot.paramMap.get('userId');
   
    if (userIdParam !== null) {
      this.userId = +userIdParam;
      
      this.getTimesheetsByUserId(this.userId);
    } else {
      
      console.error('userId parameter is null');
    }
  }

  removeTimeSheet(id: number): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation ',
        message: 'Are you sure you want to delete this request?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
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

  editTimesheet(id: number, updatedTimeSheetDTO: TimeSheetDTO): void {
    this.timesheetService.updateTimesheet(id, updatedTimeSheetDTO).subscribe(
      response => {
        console.log('TimeSheet updated successfully:', response);
      },
      error => {
        console.error('Error updating TimeSheet:', error);
        
      }
    );
  }


  navigateToUserTimesheets(id: number) {
    this.router.navigate(['tsh-edit', id]);
  }
  





  getTimesheetsByUserId(userId: number): void {
    this.timesheetService.getTimesheetsByUserId(userId)
      .subscribe(timesheets => {
        this.timesheets = timesheets;
      });
  }
}
