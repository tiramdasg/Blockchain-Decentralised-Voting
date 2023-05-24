import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-set-campaign',
  templateUrl: './admin-set-campaign.component.html',
  styleUrls: ['./admin-set-campaign.component.scss'],
})
export class AdminSetCampaignComponent {
  setup = true;
  setupform: FormGroup;
  candidates: { [key: string]: any }[] = [];
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private router: Router, private fb: FormBuilder) {
    this.setupform = this.fb.group({
      campName: ['', Validators.required, Validators.pattern('^[a-zA-Z,]*$')],
      candidateName: ['', Validators.required, Validators.pattern('^[a-zA-Z,]*$')],
      candidateParty: ['', Validators.required, Validators.pattern('^[a-zA-Z,]*$')],
      candidateText: ['', Validators.required, Validators.pattern('^[a-zA-Z,]*$')],
    });
  }

  dummy: { [key: string]: any } = {};
  showtable: boolean = false;
  displayedColumns: string[] = ['candidateName', 'candidateParty', 'candidateText'];
  addCandidates(){
    this.dummy = { 'candidateName': this.setupform.get('candidateName')?.value, 
    'candidateParty': this.setupform.get('candidateParty')?.value,
    'candidateText': this.setupform.get('candidateText')?.value };
    this.candidates.push(this.dummy);
    console.log(this.candidates);
    this.setupform.get('candidateName')?.reset();
    this.setupform.get('candidateParty')?.reset();
    this.setupform.get('candidateText')?.reset();
    this.showtable = true;
    this.table.renderRows();
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
