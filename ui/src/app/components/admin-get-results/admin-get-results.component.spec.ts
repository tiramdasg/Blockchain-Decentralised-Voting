import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGetResultsComponent } from './admin-get-results.component';

describe('AdminGetResultsComponent', () => {
  let component: AdminGetResultsComponent;
  let fixture: ComponentFixture<AdminGetResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGetResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGetResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
