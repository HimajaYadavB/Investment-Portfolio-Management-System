import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrokersService {
  private apiUrl = 'http://localhost:9000';
  constructor(private http: HttpClient) { 

  }

  brokerLoginService(credentials:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/broker-login`, credentials);
  }

  brokerRegisterService(brokerData:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/broker-register`, brokerData);
  }
}
