import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private apiUrl = 'http://localhost:9000';
  
  constructor(private http: HttpClient) { }
  
  getPendingAssets(userId: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/pending-assets`, { userId });
  }
  approveAsset(assetId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-assets`, { assetId });
  }
  
  rejectAsset(assetId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject-asset`, { assetId });
  }
}
