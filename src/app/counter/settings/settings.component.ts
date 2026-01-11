import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import {Dialog, DialogRef, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  @Output('dataToSend') dataToSend: EventEmitter<any> = new EventEmitter<any>();
  public configObj:any = {};

  constructor(@Inject(DIALOG_DATA) public data: any, public dialogRef: DialogRef<SettingsComponent>,private localStorageService:LocalStorageService){ }

  ngOnInit(){
    // console.log('modalData: ',this.data)
    this.configObj = JSON.parse(JSON.stringify(this.data));
  }

  cancel(){
    this.dialogRef.close();
  };

  setMBtn(event:any){
    this.configObj.isManual = event.target.checked;
  };

  setDBtn(event:any){
    this.configObj.duration = event.target.value;
  };

  setTBtn(event:any){
    this.configObj.title = event.target.value;
  }

  setGoal(event:any){
    this.configObj.goal = event.target.value;
  }

  setVibrate(event:any){
    this.configObj.isVibrate = event.target.checked;
  }

  setAudio(event:any){
    this.configObj.isAudio = event.target.checked;
  }

  save(){
    // console.log('configObj: ',this.configObj);
    this.localStorageService.setData('configObj',JSON.stringify(this.configObj));
    this.dataToSend.emit(this.configObj);
    this.cancel();
    // this.localStorageService.setData('','');
  }
}
