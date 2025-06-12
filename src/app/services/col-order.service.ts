import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColOrderService {
  private apiUrl = 'http://localhost:9000'; 

  constructor(private http: HttpClient) { }

  getColOrderService(userId: any, tableName: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/get-column-order`, {userId, tableName});
  }

  setColOrderService(userId: any, tableName: any, colOrder: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insert-column-order`, {userId, tableName, colOrder});
  }
}


  