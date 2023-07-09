import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTable } from '@angular/material/table';
import { ApiService } from 'src/app/api.service';
import { DbnodeService } from 'src/app/dbnode.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap } from 'rxjs/operators';

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
  setupcampaign = false;
  resetForm = false;
  tostartcampaign = false;
  votingStopped = true;
  getResult = false;
  resetEnable = false;
  startEnable = true;
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
    let data = {
      userId: this.apiservice.getVoterId(),
      handleId: "checkcampaignstatus"
    };
  
    this.databaseService.admin(data).pipe(
      concatMap((response: any) => {
        if (response.message === false) {
          this.hasCampaignstarted = false;
          response.message = "Campaign currently INACTIVE";
          this.setup = true;
          this.votingStopped = true;
        } else if (response.message === true) {
          this.hasCampaignstarted = true;
          response.message = "Campaign currently ACTIVE";
          this.setup = true;
          this.votingStopped = false;
          this.startEnable = false;
        }
        this.sb.open(response.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
  

        return this.databaseService.getAllCandidates();
      })
    ).subscribe((response: any) => {
      this.candidateNames='';
      this.numOfCandidates = response.message[0].length;
      for (var i = 0; i < response.message[0].length; i++) {
        this.candidateNames += response.message[0][i]+ ', ';

      }
      this.candidateNames = this.candidateNames.slice(0, -2);
      if (response.message[0].length === 0 && this.hasCampaignstarted === false) {
        this.resetForm = true;
        this.startEnable = true;

      }
      else if (response.message[0].length > 1 && this.hasCampaignstarted === false) {
        this.resetEnable = true;
        this.getResult = true;
        this.startEnable = false;
      }
      else {
        this.resetForm = false;
        this.startEnable = false;
      }
    }, (error: any) => {
      this.sb.open(error.error.message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000
      });
    });
  }

  addCandidates() {

    /*    this.dummy = {
          'candidateName': this.setupform.get('candidateName')?.value,
          'candidateParty': this.setupform.get('candidateParty')?.value,
          'candidateText': this.setupform.get('candidateText')?.value
        };
        this.candidates.push(this.dummy); */

    const data = {
      candidateName: this.setupform.value.candidateName,
      candidateParty: this.setupform.value.candidateParty,
      candidateText: this.setupform.value.candidateText,
      userId: this.apiservice.getVoterId(),
      handleId: "addcandidate"
    }
    this.databaseService.admin(data).subscribe({
      next: (res: any) => {
        this.sb.open(res.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        this.candidates.splice(0, this.candidates.length);
        this.databaseService.getAllCandidates().subscribe({
          next: (response: any) => {
            this.candidates = [];
            this.numOfCandidates= response.message[0].length;
            this.candidateNames='';
            for (var i = 0; i < response.message[0].length; i++) {
              this.candidateNames += response.message[0][i]+ ', ';
              this.dummy = {
                'candidateName': response.message[0][i],
                'candidateParty': response.message[1][i],
                'candidateText': response.message[2][i]
              };
              this.candidateNames = this.candidateNames.slice(0, -2);
              if (response.message[0].length > 1)
                this.tostartcampaign = true;
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
            this.sb.open(error.error.message, '', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 5000
            });
          }
        });
      },
      error: (error: any) => {
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
    this.candidates.splice(0, this.candidates.length);
    this.databaseService.getAllCandidates().subscribe({
      next: (response: any) => {
        this.setup = false;
        this.setupcampaign = true;
        this.candidateNames='';
        for (var i = 0; i < response.message[0].length; i++) {
          this.candidateNames += response.message[0][i]+ ', ';
          this.dummy = {
            'candidateName': response.message[0][i],
            'candidateParty': response.message[1][i],
            'candidateText': response.message[2][i]
          }
          this.candidateNames = this.candidateNames.slice(0, -2);
          if (response.message[0].length > 1)
            this.tostartcampaign = true;
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
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
    //this.candidateNames = this.candidates.map(item => item['candidateName']).join(', ');
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
        this.resetForm = false;
        this.setup = true;
        this.setupcampaign = false;
        this.votingStopped = false;
        this.getResult=false;
        this.resetEnable = false;
        this.startEnable = false;
        this.sb.open(res.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (error: any) => {
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
    //this.setup = !this.setup; // to make the form disappear after starting campaign
  }

  stopCampaign() {
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "stopCampaign"
    }
    this.databaseService.admin(data).subscribe({
      next: (res: any) => {
        this.hasCampaignstarted = false;
        this.resetForm=false;
        this.votingStopped=true;
        this.getResult = true;
        this.resetEnable = true;
        this.sb.open(res.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (error: any) => {
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
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "resetCampaign"
    }
    this.databaseService.admin(data).subscribe({
      next: (res: any) => {
        this.hasCampaignstarted = false;
        this.resetForm=true;
        this.votingStopped=true;
        this.getResult = false;
        this.resetEnable = false;
        this.startEnable = true;
        this.candidateNames = '';
        this.numOfCandidates = 0;
        this.sb.open(res.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (error: any) => {
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
  }
}
