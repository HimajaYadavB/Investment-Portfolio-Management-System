import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private apiUrl = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  importPortfolios(portfolios: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/import-portfolios`, {portfolios});
  }

  importAssets(assets: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/import-assets`, {assets});
  }

  
  private importEmitter = new Subject<{ action: string; data: any[] }>();
  importObservable = this.importEmitter.asObservable();

  emitImportedData(data: any[]) {
    this.importEmitter.next({ action: 'import', data });
  }
}
