import { OnDestroy, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import  vote  from 'D:/TUHH_ICS/Sem3_SS23/Advanced Internet Computing/PBL/UI-test/voteweb3.js'
import { MyComponent } from './vote.web3';

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
export class VoteComponent implements OnDestroy{
  displayedColumns: string[] = ['candidateName', 'candidateParty', 'candidateNote'];
  dataSource = new MatTableDataSource<CandidateInfo>(CANDIDATE_LIST);

  selectedCandidate: Set<CandidateInfo> = new Set();

  selectCandidate(row: any){
    this.selectedCandidate = new Set();
    this.selectedCandidate.add(row)
  }

  reset(){
    this.selectedCandidate = new Set();
  }

  web3 = new MyComponent()
  castVote(){
    console.log(this.web3.vote());
  }

  ngOnDestroy(){
    sessionStorage.setItem('role', 'waiting')
  }

}
