export interface User{
    id:number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    role: string;
    daysOff: number;
    //here 21
    createdBy : string;
    modifiedBy : string;
    modifiedAt : Date;
  
    // constructor(
    //   firstName: string = '',
    //   lastName: string = '',
    //   userName: string = '',
    //   password: string = '',
    //   role: string = 'USER',
    //   daysOff: number = 20
    // ) {
    //   this.firstName = firstName;
    //   this.lastName = lastName;
    //   this.userName = userName;
    //   this.password = password;
    //   this.role = role;
    //   this.daysOff = daysOff;
    // }
    
}