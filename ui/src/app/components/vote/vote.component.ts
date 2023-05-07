import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NONE_TYPE } from '@angular/compiler';
import { OnDestroy, Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  providers: [MatSort]
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

  ngOnDestroy(){
    sessionStorage.setItem('role', 'waiting')
  }

}
