import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIssuesDashboardComponent } from './admin-issues-dashboard.component';

describe('AdminIssuesDashboardComponent', () => {
  let component: AdminIssuesDashboardComponent;
  let fixture: ComponentFixture<AdminIssuesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIssuesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIssuesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
