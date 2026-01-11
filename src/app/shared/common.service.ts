import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  isTouchDevice(){
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (error) {
      return false;
    };
  }
}
