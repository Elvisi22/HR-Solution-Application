import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTimesheetViewComponent } from './manager-timesheet-view.component';

describe('ManagerTimesheetViewComponent', () => {
  let component: ManagerTimesheetViewComponent;
  let fixture: ComponentFixture<ManagerTimesheetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerTimesheetViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerTimesheetViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
