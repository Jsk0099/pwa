import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {  }

  setData(label:string,data:any){
    try {
      localStorage.setItem(label, data);
      return true;
    } catch (error) {
      return false;
    };
  };

  getData(label:string){
    return localStorage.getItem(label) ? localStorage.getItem(label) : false ;
  };
}
