import { OnDestroy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import  vote  from 'D:/TUHH_ICS/Sem3_SS23/Advanced Internet Computing/PBL/UI-test/voteweb3.js'
import { VoteWeb3Component } from './vote.web3';
import { ApiService } from 'src/app/api.service';
import { DbnodeService } from 'src/app/dbnode.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CandidateInfo {
  candidateName: string;
  candidateParty: string;
  candidateNote: string;
}
const CANDIDATE_LIST: CandidateInfo[] = [
  {
    candidateName: 'XYZ',
    candidateParty: 'XYZ Party',
    candidateNote: 'Vote for me for free desserts!',
  },
  {
    candidateName: 'ABC',
    candidateParty: 'ABC Party',
    candidateNote: 'Vote for me for faster internet!',
  },
  {
    candidateName: 'ASDF',
    candidateParty: 'ASDF Party',
    candidateNote: 'Vote for me for no exams!',
  },
];

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  providers: []
})
export class VoteComponent implements OnDestroy {
  constructor(private apiservice: ApiService,
    private databaseService: DbnodeService,
    private sb: MatSnackBar) {
    //console.log(this.apiservice.getVoterId())
  }
  displayedColumns: string[] = ['candidateName', 'candidateParty', 'candidateNote'];
  dataSource = new MatTableDataSource<CandidateInfo>(CANDIDATE_LIST);

  selectedCandidate: Set<CandidateInfo> = new Set();

  selectCandidate(row: any) {
    this.selectedCandidate = new Set();
    this.selectedCandidate.add(row)
  }

  reset() {
    this.selectedCandidate = new Set();
  }

  web3 = new VoteWeb3Component()
  castVote() {
    const [x] = this.selectedCandidate;
    //console.log(x);
    const data = {
      VoterID: this.apiservice.getVoterId(),
      candidate_index: 1
    }
    console.log(data.VoterID);
    this.databaseService.vote(data).subscribe({
      next: (response: any) => {
        console.log(response.message);
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

  ngOnDestroy() {
    sessionStorage.setItem('role', 'waiting')
  }

}
