import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/model/user';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {

  transform(users : User[] | null , role : string):User[] | null {
    if(!users || !role){
      return users;
    }
    return users.filter(users => users.role === role);
  }

}
