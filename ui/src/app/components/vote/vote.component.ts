import { LiveAnnouncer } from '@angular/cdk/a11y';
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
export class VoteComponent implements AfterViewInit, OnDestroy{
  displayedColumns: string[] = ['candidateName', 'candidateParty', 'candidateNote'];
  dataSource = new MatTableDataSource<CandidateInfo>(CANDIDATE_LIST);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  sortState!: Sort;
  //  Announce the change in sort state 
  announceSortChange($event: any) {
    this.sortState = $event as Sort;
    if (this.sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${this.sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnDestroy(){
    sessionStorage.setItem('role', 'waiting')
  }

}
