import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {

  private apiUrl = 'http://localhost:9000';
  
  constructor(private http: HttpClient) { }
  
  getPendingPortfolios(userId: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/pending-portfolios`, {userId});
  }
  approvePortfolio(portfolioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve-portfolios`, { portfolioId });
  }
  
  rejectPortfolio(portfolioId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject-portfolio`, { portfolioId });
  }

}
