import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetService } from '../service/timesheet-service/timesheet.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent {
  timesheetForm: FormGroup;
  today: Date = new Date();
  timesheetId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private timesheetService: TimesheetService
    ,private route: ActivatedRoute
  ) {
    this.timesheetForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      status: ['', Validators.required],
      note: ['', [Validators.required, Validators.maxLength(45)]],
      userId: ['', [Validators.required, Validators.maxLength(45)]]
    });
  }


  onSubmit(): void {
    if (this.timesheetForm.valid) {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam !== null) {
        const timesheetId = +idParam;
        const updatedTimeSheetDTO = this.timesheetForm.value;
        this.timesheetService.updateTimesheet(timesheetId, updatedTimeSheetDTO).subscribe(
          response => {
            
            console.log('Timesheet updated successfully:', response);
          },
          error => {
            
            console.error('Error updating timesheet:', error);
          }
        );
      } else {
        console.error('ID parameter is null.');
      }
    }
  }
  
  
}
