import { Component } from '@angular/core';
import { CommonService } from '../shared/common.service';
import { LocalStorageService } from '../shared/local-storage.service';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { NgClass, NgIf } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';

@Component({
  selector: 'app-counter',
  imports: [DialogModule, NgClass, NgIf],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  title:string;
  isTouchDevice = false;
  counter = 0;
  timeOut:any;
  isFullScreen = false;
  isResume = false;
  configData: any = {};
  isCounterShow = false;

  constructor(private localStorageService:LocalStorageService, private common:CommonService, private dialog: Dialog){ 
    this.isTouchDevice = this.common.isTouchDevice();
    this.configData = this.localStorageService.getData('configObj') ? JSON.parse(this.localStorageService.getData('configObj') as string) : {} ;
    this.title = this.configData.title || 'Jay Shree Krishna';
    if(this.localStorageService.getData('counter')){
      this.counter = parseInt(this.localStorageService.getData('counter') as string);
      this.isResume = true;
    }
    let isCountShow = this.localStorageService.getData('isCounterShow') as unknown as boolean;
    if(isCountShow == undefined) { this.localStorageService.setData('isCounterShow', true); }
    this.isCounterShow = (isCountShow == undefined ? true : isCountShow);
   }

  ngOnInit(){
 
  }

  toggleFullScreen(){
    if(document.fullscreenElement){
      document.exitFullscreen();
      this.isFullScreen = false;
    } else {
      document.getElementById('fullscreen-ele')?.requestFullscreen();
      this.isFullScreen = true;
    }
  }

  showHideCounter(){
    this.isCounterShow = !this.isCounterShow;
    this.localStorageService.setData('isCounterShow', this.isCounterShow);
  }

  ngOnDestroy(){
    this.timeOut && clearTimeout(this.timeOut);
  }

  validateInput(event:any){
    if(event.keyCode == 13){
      return false;
    }else{
      return true;
    }
  }

  onTitleChange(event: any): void {
    if(event.target.innerText.length>0 && event.target.innerText.length <= 50){
      this.localStorageService.setData('title',event.target.innerText);
    }else{
      document.getElementById('title')!.innerHTML = this.title;
      alert('Please Enter Valid Title');
    };
  };

  resumeCounter(){
    event?.stopPropagation();
    event?.preventDefault();
    this.counter = parseInt(this.localStorageService.getData('counter') as string);
  }

  saveCounter(){
    event?.stopPropagation();
    event?.preventDefault();
    this.localStorageService.setData('counter',this.counter);
    this.isResume = true;
  }

  resetCounter(){
    event?.stopPropagation(); 
    event?.preventDefault();
    this.counter = 0;
    this.isResume = false;
    this.localStorageService.setData('counter',this.counter);
  }

  increment(){
    if(!this.configData.isManual){
      this.timeOut && clearTimeout(this.timeOut);
      this.timeOut = setTimeout(this.saveCounter.bind(this), this.configData.duration ? this.configData.duration*1000 : 1000);
    }
    this.counter++;
    if(this.configData.goal > 0 && this.configData.goal == this.counter){
      if(this.configData.isVibrate && navigator.vibrate){
        navigator.vibrate(200);
      }
      if(this.configData.isAudio){
        let audio = new Audio('assets/audios/bell.mp3');
        audio.play();
      }
    }
  };

  openSettingModal(){
    let ref:any= this.dialog.open(SettingsComponent,{
      panelClass:'dialog-panel',
      disableClose: true,
      autoFocus: false,
      data:this.configData
    });

    ref.componentInstance.dataToSend.subscribe((data:any)=>{
      this.configData = data;
    })
  }

}
