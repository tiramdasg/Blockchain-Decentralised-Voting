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

  checkEmail(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/email`,data);
  }

  verifyEmail(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/emailverify`,data);
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/otpverify`,data);
  }

  add(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  getAllCandidates(): Observable<any> {
    return this.http.get(`${baseUrl}/candidates`);
  }

  vote(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${data.VoterID}}`, data);
  }

  admin(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/functions`, data);
  }

  // voters list to be approved
  approveUsersList(): Observable<any> {
    return this.http.get(`${baseUrl}/getapprove`)
  }

  approveVoter(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/approvevoter`, data)
  }

}
