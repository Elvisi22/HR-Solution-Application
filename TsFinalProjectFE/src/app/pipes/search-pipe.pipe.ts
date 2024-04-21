import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {


  transform(users: any[], searchQuery: string): any[] {
    if (!users || !searchQuery) {
      return users; // Return the original list if either users or searchQuery is empty
    }

    // Perform case-insensitive search by converting both user name and search query to lowercase
    return users.filter(user =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

}
