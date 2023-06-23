import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import { DbnodeService } from 'src/app/dbnode.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-set-campaign',
  templateUrl: './admin-set-campaign.component.html',
  styleUrls: ['./admin-set-campaign.component.scss'],
})
export class AdminSetCampaignComponent implements OnInit {
  setup = false;
  setupform: FormGroup;
  candidates: { [key: string]: any }[] = [];
  dummy: { [key: string]: any } = {};
  showtable: boolean = false;
  hasCampaignstarted: boolean = false;
  displayedColumns: string[] = ['candidateName', 'candidateParty', 'candidateText'];
  numOfCandidates: number = 0;
  candidateNames: string = '';

  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private router: Router, private fb: FormBuilder, private apiservice: ApiService, private databaseService: DbnodeService, private sb: MatSnackBar) {
    this.setupform = this.fb.group({
      campName: [''/*, [Validators.required, Validators.pattern('^[a-zA-Z,]*$')]*/],
      candidateName: ['', [Validators.required, Validators.pattern('^[a-zA-Z, !-]*$')]],
      candidateParty: ['', [Validators.required, Validators.pattern('^[a-zA-Z, !-]*$')]],
      candidateText: ['', [Validators.required, Validators.pattern('^[a-zA-Z, !-]*$')]],
    });
  }

  ngOnInit(): void {
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "checkcampaignstatus"
    }
    this.databaseService.admin(data).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response.message === false) {
          this.hasCampaignstarted = false;
          response.message = "Campaign currently INACTIVE"
        }
        else if (response.message === true) {
          this.hasCampaignstarted = true;
          response.message = "Campaign currently ACTIVE";
          this.setup = true;
        }
        this.sb.open(response.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (error: any) => {
        console.log(error.error.message);
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
  }

  addCandidates() {

    /*    this.dummy = {
          'candidateName': this.setupform.get('candidateName')?.value,
          'candidateParty': this.setupform.get('candidateParty')?.value,
          'candidateText': this.setupform.get('candidateText')?.value
        };
        this.candidates.push(this.dummy); */
    //console.log(this.candidates);

    const data = {
      candidateName: this.setupform.value.candidateName,
      candidateParty: this.setupform.value.candidateParty,
      candidateText: this.setupform.value.candidateText,
      userId: this.apiservice.getVoterId(),
      handleId: "addcandidate"
    }
    console.log(data)
    //console.log(data.VoterID)
    this.databaseService.admin(data).subscribe({
      next: (res: any) => {
        this.sb.open(res.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        this.databaseService.getAllCandidates().subscribe({
          next: (response: any) => {
            console.log(response.message);
            this.candidates = [];
            for (var i = 0; i < response.message[0].length; i++) {
              this.dummy = {
                'candidateName': response.message[0][i],
                'candidateParty': response.message[1][i],
                'candidateText': response.message[2][i]
              };
              console.log(this.dummy)
              this.candidates.push(this.dummy);
              this.showtable = true;
              //this.table.renderRows();
              /*CANDIDATE_LIST.push({
                candidateName: response.message[0][i],
                candidateParty: response.message[1][i],
                candidateNote: response.message[2][i]
              }); */
            }
          },
          error: (error: any) => {
            console.log(error.error.message);
            this.sb.open(error.error.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 5000
            });
          }
        });
      },
      error: (error: any) => {
        console.log(error.error.message);
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
    this.setupform.get('candidateName')?.reset();
    this.setupform.get('candidateParty')?.reset();
    this.setupform.get('candidateText')?.reset();
    this.showtable = true;
    this.table.renderRows();
  }

  setupCampaign() {
    this.setup = !this.setup;
    this.databaseService.getAllCandidates().subscribe({
      next: (response: any) => {
        console.log(response.message);
        for (var i = 0; i < response.message[0].length; i++) {
          this.dummy = {
            'candidateName': response.message[0][i],
            'candidateParty': response.message[1][i],
            'candidateText': response.message[2][i]
          };
          console.log(this.dummy)
          this.candidates.push(this.dummy);
          this.showtable = true;
          //this.table.renderRows();
          /*CANDIDATE_LIST.push({
            candidateName: response.message[0][i],
            candidateParty: response.message[1][i],
            candidateNote: response.message[2][i]
          }); */
        }
      },
      error: (error: any) => {
        console.log(error.error.message);
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
    this.candidateNames = this.candidates.map(item => item['candidateName']).join(', ');
  }

  startCampaign() {
    //this.setup = !this.setup;
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "startCampaign"
    }
    this.databaseService.admin(data).subscribe({
      next: (res: any) => {
        this.hasCampaignstarted = true;
        this.sb.open(res.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (error: any) => {
        console.log(error.error.message);
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
    this.setup = !this.setup; // to make the form disappear after starting campaign
  }

  stopCampaign() {
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "stopCampaign"
    }
    this.databaseService.admin(data).subscribe({
      next: (res: any) => {
        this.hasCampaignstarted = false;
        this.sb.open(res.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (error: any) => {
        console.log(error.error.message);
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });

    // add backend or web3 code here for reset
  }

  getResults() {
    this.router.navigate(['/admin-get-results']);
  }

  reset() {
    this.setupform.reset(); // only form reset, no need to save data for next campaign
    // add backend or web3 code here for reset
  }
}
