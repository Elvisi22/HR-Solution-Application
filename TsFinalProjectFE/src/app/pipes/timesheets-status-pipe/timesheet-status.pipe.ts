import { Pipe, PipeTransform } from '@angular/core';
import { TimeSheetDTO } from 'src/model/TimeSheetDTO';

@Pipe({
  name: 'timesheetStatus'
})
export class TimesheetStatusPipe implements PipeTransform {

  transform(timesheets: TimeSheetDTO[] | null, status: string): TimeSheetDTO[] | null {
    if (!timesheets || !status) {
      return timesheets;
    }

    return timesheets.filter(timesheet => timesheet.status === status);
  }

}
