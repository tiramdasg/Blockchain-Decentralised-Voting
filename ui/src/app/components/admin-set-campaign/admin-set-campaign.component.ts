import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-set-campaign',
  templateUrl: './admin-set-campaign.component.html',
  styleUrls: ['./admin-set-campaign.component.scss'],
})
export class AdminSetCampaignComponent {
  setup = true;
  setupform: FormGroup;
  candidates: string[] = ['ABC', 'XYZ', 'ASDF'];

  constructor(private router: Router, private fb: FormBuilder) {
    this.setupform = this.fb.group({
      campName: ['', Validators.required, Validators.pattern('^[0-9]*$')],
      candidates: ['', Validators.required],
    });
  }

  setupCampaign() {
    this.setup = !this.setup;
  }

  startCampaign() {
    this.setup = !this.setup;
  }

  stopCampaign() {}

  getResults() {
    this.router.navigate(['/admin-get-results']);
  }
}
