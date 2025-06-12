import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private detailsData = new BehaviorSubject<any>(null);
  private displayKeys = new BehaviorSubject<string[] | null>(null);
  private titleSubject = new BehaviorSubject<string>('');
  private backTextSubject = new BehaviorSubject<string>('');
  private backUrlSubject = new BehaviorSubject<string>('');

  setDetailsData(data: any, keys: string[], title:string, backtext:string, backurl: string) {
    this.detailsData.next(data);
    this.displayKeys.next(keys);
    this.titleSubject.next(title);
    this.backTextSubject.next(backtext);
    this.backUrlSubject.next(backurl);
  }

  getDetailsData() {
    return this.detailsData.value;
  }

  getDisplayKeys() {
    return this.displayKeys.value;
  }
  getTitle(){
    return this.titleSubject.asObservable();
  }

  getBackText(){
    return this.backTextSubject.asObservable();
  }
  getBackUrl(){
    return this.backUrlSubject.asObservable();
  }




}
