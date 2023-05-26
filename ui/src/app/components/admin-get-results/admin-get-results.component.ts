import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-get-results',
  templateUrl: './admin-get-results.component.html',
  styleUrls: ['./admin-get-results.component.scss']
})
export class AdminGetResultsComponent implements OnInit {
  displayedColumns: string[] = ['candidateName', 'candidateParty', 'candidateText', 'candidateVotes'];
  candidates: { [key: string]: any }[] = []
  
  ngOnInit(): void {
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
