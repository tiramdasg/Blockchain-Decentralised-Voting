import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetCampaignComponent } from './admin-set-campaign.component';

describe('AdminSetCampaignComponent', () => {
  let component: AdminSetCampaignComponent;
  let fixture: ComponentFixture<AdminSetCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSetCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSetCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
