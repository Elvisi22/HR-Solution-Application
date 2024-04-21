import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TimeSheetDTO } from 'src/model/TimeSheetDTO';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private baseUrl = 'http://localhost:8080/timesheet';

  constructor(private http: HttpClient) { }

  createTimesheet(timesheetData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, timesheetData);
  }


  getTimesheetsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users/${userId}`);
  }

  removeTimeSheet(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/remove/${id}`);
  }

  updateTimesheet(timesheetId: number, updatedTimeSheetDTO: TimeSheetDTO): Observable<TimeSheetDTO> {
    return this.http.put<TimeSheetDTO>(`${this.baseUrl}/updatebyManager/${timesheetId}`, updatedTimeSheetDTO);
  }
  
  updateTimesheetbyUser(timesheetId: number, updatedTimeSheetDTO: TimeSheetDTO): Observable<TimeSheetDTO> {
    return this.http.put<TimeSheetDTO>(`${this.baseUrl}/update/${timesheetId}`, updatedTimeSheetDTO);
  }

  getTimesheetById(timesheetId: number): Observable<TimeSheetDTO> {
    return this.http.get<TimeSheetDTO>(`${this.baseUrl}/${timesheetId}`);
  }
}
