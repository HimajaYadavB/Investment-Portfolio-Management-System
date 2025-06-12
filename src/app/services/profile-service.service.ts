import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  constructor(private http: HttpClient) { }

  
  private apiUrl = 'http://localhost:9000';

  updateProfile(userId: number, user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-profile`, {
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    });
  }
}
