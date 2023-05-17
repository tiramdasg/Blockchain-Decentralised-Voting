import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/voters';

@Injectable({
  providedIn: 'root'
})
export class DbnodeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  checkcredentials(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/${data.VoterID}`,data);
  }

  add(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  vote(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${data.VoterID}}`, data);
  }
}
