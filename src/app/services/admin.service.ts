import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:9000';
  
  constructor(private http: HttpClient) { }
  
  adminloginservice(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/admin-login`, credentials);
  }

  adminGetPendingBrokers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending-brokers`);
  }
  
  approveBroker(brokerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-broker`, { brokerId });
  }
  
  rejectBroker(brokerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject-broker`, { brokerId });
  }
  
}
