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
  } [];

  constructor(private apiservice: ApiService,
    private databaseService: DbnodeService,
    private sb: MatSnackBar) {      
    // this.voters_to_be_approved = [];
    this.databaseService.approveUsersList().subscribe({
      next: (response: any) => {
        console.log(response);
        this.voters_to_be_approved = response;
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

  ngOnInit(): void {
    
  }

  approveVoter(user: any){
    // console.log(user)
    this.databaseService.approveVoter(user.VoterID).subscribe({
      next: (response: any) => {
        console.log(response);
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
