import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {

  private apiUrl = 'http://localhost:9000';
  private email: string = ''; // Property to store email

  // Setter for email
  setEmailService(email: string) {
    this.email = email;
  }

  // Getter for email
  getEmailService(): string {
    return this.email;
  }

  constructor(private http: HttpClient) { 

  }

  getportfolioservice(): Observable<any>{
    return this.http.post(`${this.apiUrl}/user-portfolio`, {email: this.email});
  }

  getassetservice(): Observable<any>{
    return this.http.post(`${this.apiUrl}/user-asset`,{email:this.email});
  }


  getDividendService():Observable<any>{
    return this.http.post(`${this.apiUrl}/user-dividend`,{email:this.email});
  }

  getBrokersService():Observable<any>{
    return this.http.post(`${this.apiUrl}/get-brokers`, {})
  }

  buyAssetService(info:any){
    return this.http.post(`${this.apiUrl}/buy-asset`,info)
  }

  sellAssetService(info:any){
    return this.http.post(`${this.apiUrl}/sell-asset`,info)
  }

  getAssetTypeService():Observable<any>{
    return this.http.post(`${this.apiUrl}/get-asset-type`, {})
  }

  getPortfolioTypeService():Observable<any>{
    return this.http.post(`${this.apiUrl}/get-portfolio-type`, {})
  }

  addPortfolioService(info:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/add-portfolio`, info)
  }

  getTaxesService():Observable<any>{
    return this.http.post(`${this.apiUrl}/user-taxes`,{email:this.email})
  }

  
}
