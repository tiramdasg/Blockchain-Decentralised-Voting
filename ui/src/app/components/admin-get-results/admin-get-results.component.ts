import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-get-results',
  templateUrl: './admin-get-results.component.html',
  styleUrls: ['./admin-get-results.component.scss']
})
export class AdminGetResultsComponent {
  campaigns: string[] = ['Campaign 1', 'Camp 2'];

}
