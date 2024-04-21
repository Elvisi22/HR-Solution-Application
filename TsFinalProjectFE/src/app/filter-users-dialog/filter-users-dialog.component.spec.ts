import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterUsersDialogComponent } from './filter-users-dialog.component';

describe('FilterUsersDialogComponent', () => {
  let component: FilterUsersDialogComponent;
  let fixture: ComponentFixture<FilterUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterUsersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
