import { Pipe, PipeTransform } from '@angular/core';
import { TimeSheetDTO } from 'src/model/TimeSheetDTO';

@Pipe({
  name: 'createdAtPipe'
})
export class CreatedAtPipePipe implements PipeTransform {
  transform(timesheets: TimeSheetDTO[]): TimeSheetDTO[] {
    if (!timesheets || timesheets.length === 0) {
      return timesheets;
    }
    return timesheets.slice().reverse();
  }
}
