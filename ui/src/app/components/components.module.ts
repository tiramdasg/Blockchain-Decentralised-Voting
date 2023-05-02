import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { VoteComponent } from './vote/vote.component';
import { AdminApproveComponent } from './admin-approve/admin-approve.component';
import { AdminSetCampaignComponent } from './admin-set-campaign/admin-set-campaign.component';
import { AdminGetResultsComponent } from './admin-get-results/admin-get-results.component';


@NgModule({
  declarations: [
  
    VoteComponent,
       AdminApproveComponent,
       AdminSetCampaignComponent,
       AdminGetResultsComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule
  ]
})
export class ComponentsModule { }
