import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { FormsModule, NgModel } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { UserViewComponent } from './user-view/user-view.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ManagerTimesheetViewComponent } from './manager-timesheet-view/manager-timesheet-view.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { SignupComponent } from './signup/signup.component';
import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { TimesheetStatusPipe } from './pipes/timesheets-status-pipe/timesheet-status.pipe';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { RolesPipe } from './pipes/user-roles/roles.pipe';
import { SortByModifiedAtPipe } from './pipes/modifiedAt/sort-by-modified-at.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CreatedAtPipePipe } from './pipes/timesheet-createdAt-pipe/created-at-pipe.pipe';
import { FilterUsersDialogComponent } from './filter-users-dialog/filter-users-dialog.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    UserListComponent,
    NavbarComponent,
    FooterComponent,
    LandingPageComponent,
    TimesheetComponent,
    UserViewComponent,
    ManagerTimesheetViewComponent,
    EditTimesheetComponent,
    SignupComponent,
    SearchPipePipe,
    TimesheetStatusPipe,
    EditUserProfileComponent,
    ConfirmationDialogComponent,
    CreateUserComponent,
    RolesPipe,
    SortByModifiedAtPipe,
    CreatedAtPipePipe,
    FilterUsersDialogComponent
    
    
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    HttpClientModule,
    MatSelectModule,
    MatSnackBarModule
    
        

   
    
    
  
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
