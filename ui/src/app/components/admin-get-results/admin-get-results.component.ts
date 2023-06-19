import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/api.service';
import { DbnodeService } from 'src/app/dbnode.service';

@Component({
  selector: 'app-admin-get-results',
  templateUrl: './admin-get-results.component.html',
  styleUrls: ['./admin-get-results.component.scss']
})
export class AdminGetResultsComponent implements OnInit {
  displayedColumns: string[] = ['candidateName', 'candidateParty', 'candidateText', 'candidateVotes'];
  candidates: { [key: string]: any }[] = []
  dummy: { [key: string]: any } = {};
  constructor(private apiservice: ApiService, private databaseService: DbnodeService, private sb: MatSnackBar) {
  }

  ngOnInit(): void {
    var x: any[] = [];
    const data = {
      userId: this.apiservice.getVoterId(),
      handleId: "checkresult"
    }
    console.log("Data: "+data.userId)
    this.databaseService.admin(data).subscribe({
      next: (response: any) => {
        console.log("Result got is:" + response.message)
        x = response.message
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

    this.databaseService.getAllCandidates().subscribe({
      next: (response: any) => {
        console.log(response.message);
        this.candidates = [];
        for (var i = 0; i < response.message[0].length; i++) {
          this.dummy = {
            'candidateName': response.message[0][i],
            'candidateParty': response.message[1][i],
            'candidateText': response.message[2][i],
            'candidateVotes': x[i]
          };
          console.log(this.dummy)
          this.candidates.push(this.dummy);
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


    /*
        this.candidates = [
          {
            'candidateName': 'ABC',
           'candidateParty': 'ABC Party', 
           'candidateText': 'Vote for free coffee!', 
           'candidateVotes':'25'
          },
          {
            'candidateName': 'XYZ',
           'candidateParty': 'XYZ Party', 
           'candidateText': 'Vote for free coffee!', 
           'candidateVotes':'10'
          },
          {
            'candidateName': 'ASDF',
           'candidateParty': 'ASDF Party', 
           'candidateText': 'Vote for free coffee!', 
           'candidateVotes':'15'
          },
        ];
      */

    this.sortTableData('candidateVotes');
  }

  sortTableData(columnName: string) {
    this.candidates.sort((a, b) => {
      const valueA = parseInt(a[columnName]);
      const valueB = parseInt(b[columnName]);
      if (valueA > valueB) {
        return -1;
      } else if (valueA < valueB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
