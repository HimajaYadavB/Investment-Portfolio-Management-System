import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  registerservice(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-register`, userData);
  }

  loginservice(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-login`, credentials);
  }
}
