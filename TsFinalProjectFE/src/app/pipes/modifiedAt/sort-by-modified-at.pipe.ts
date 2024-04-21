import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/model/user';

@Pipe({
  name: 'sortByModifiedAt'
})
export class SortByModifiedAtPipe implements PipeTransform {
  transform(users: User[] ): User[]  {
    if (!users) {
      return users;
    }
    // Sort the array based on the modifiedAt property in descending order
    return users.sort((a, b) => {
      const dateA = new Date(a.modifiedAt);
      const dateB = new Date(b.modifiedAt);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
