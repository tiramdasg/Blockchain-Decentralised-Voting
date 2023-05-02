import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VoteComponent } from './components/vote/vote.component';
import { AdminApproveComponent } from './components/admin-approve/admin-approve.component';
import { AdminGetResultsComponent } from './components/admin-get-results/admin-get-results.component';
import { AdminSetCampaignComponent } from './components/admin-set-campaign/admin-set-campaign.component';
// comment
const routes: Routes = [
  { path: 'login-register', component: LoginComponent} ,
  { path:'vote', component: VoteComponent },
  { path: 'admin-approve', component: AdminApproveComponent },
  { path: 'admin-get-results', component: AdminGetResultsComponent },
  { path: 'admin-set-campaign', component: AdminSetCampaignComponent },
  { path: '',   redirectTo: 'login-register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { 

}
