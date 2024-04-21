import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { UserViewComponent } from './user-view/user-view.component';
import { ManagerTimesheetViewComponent } from './manager-timesheet-view/manager-timesheet-view.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { RoleGuard } from './guard/roleGuard/role.guard';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { CreateUserComponent } from './create-user/create-user.component';


const routes: Routes = [
  {path:'' , component : LandingPageComponent},
  {path:'login' , component : LoginFormComponent},
  {path:'signup' , component : SignupComponent},
  {path:'user-list' , component : UserListComponent , canActivate:[AuthenticationGuard , RoleGuard]},
  {path:'timesheet-creation' , component : TimesheetComponent},
  {path:'user-view' , component : UserViewComponent , canActivate:[AuthenticationGuard]},
  {path:'tsh-view/:userId' , component : ManagerTimesheetViewComponent, canActivate:[AuthenticationGuard]},
  {path:'tsh-edit/:id' , component : EditTimesheetComponent , canActivate:[AuthenticationGuard]},
  {path:'edit-profile/:id' , component : EditUserProfileComponent , canActivate:[AuthenticationGuard]},
  {path:'create-user' , component : CreateUserComponent , canActivate:[AuthenticationGuard , RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
