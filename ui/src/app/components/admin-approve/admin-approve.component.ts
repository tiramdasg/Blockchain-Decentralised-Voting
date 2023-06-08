import { Component, DoCheck, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { DbnodeService } from 'src/app/dbnode.service';

@Component({
  selector: 'app-admin-approve',
  templateUrl: './admin-approve.component.html',
  styleUrls: ['./admin-approve.component.scss']
})
export class AdminApproveComponent implements OnInit {
  panelOpenState = false;
  voters_to_be_approved !: {
    'VoterID': number,
    'VoterName': string,
    'Email': string,
    'isAdmin': number,
    'isApproved': number
  }[];

  constructor(private apiservice: ApiService,
    private databaseService: DbnodeService,
    private sb: MatSnackBar) {
  }

  ngOnInit(): void {
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "approverlist"
    }
    this.databaseService.admin(data).subscribe({
      next: (response: any) => {
        if (response.message) {
        this.sb.open(response.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        if (this.voters_to_be_approved)
          this.voters_to_be_approved.pop();
        }
        else {
          console.log(response);
          this.voters_to_be_approved = response;
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
  }

  approveVoter(user: any) {
    // console.log(user)
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "approvevoter",
      voterid: user.VoterID
    }
    this.databaseService.admin(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.sb.open(response.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        this.ngOnInit()
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

}
