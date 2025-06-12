import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavLinksService {
  private apiUrl = 'http://localhost:9000'; 
  constructor(private http: HttpClient) { }
  
  getFavouriteLinks(userId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-fav`, {userId});
  }

  getUnselectedFavorites(userId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user-fav-config`, {userId});
  }

  markAsSelected(userId:any, linkId:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/select-fav-link`, {userId, linkId});
  }

  deleteSelected(userId:any, linkId: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/delete-fav-link`, {userId, linkId})
  }
  updateOrderIndex(userId: number, orderedLinkIds: number[]) {
    return this.http.post(`${this.apiUrl}/update-order-index`, {
      userId,
      orderedLinkIds
    });
  }


  private favLinksEmitter = new Subject<{ action: string; data: any[] }>();
  favLinksObservable = this.favLinksEmitter.asObservable();

  emitFavLinks(data: any[]) {
    this.favLinksEmitter.next({ action: 'update', data });
  }
}
