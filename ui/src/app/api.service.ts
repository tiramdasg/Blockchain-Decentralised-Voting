import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private voterId:any;
  constructor() {
   }

   setVoterId(voterId: any) {
    this.voterId = voterId;
  }
  getVoterId() {
    return this.voterId;
  }
}
