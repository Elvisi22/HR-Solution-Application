import { Injectable } from '@angular/core';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginHandlerService {

  constructor(private userService : UserService) { }



  // userLoggedIn(role : string){
  //   localStorage.setItem('STATE' , 'true')
  //   localStorage.setItem('ROLE' , role)
  // }

  // logout(){
  //   localStorage.clear()
  // }
}
