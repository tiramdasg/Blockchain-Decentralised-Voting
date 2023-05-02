import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveComponent } from './admin-approve.component';

describe('AdminApproveComponent', () => {
  let component: AdminApproveComponent;
  let fixture: ComponentFixture<AdminApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
