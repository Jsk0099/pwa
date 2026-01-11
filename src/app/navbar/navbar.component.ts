import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navigationList:any; 
  isDarkMode = false; 
  
  constructor(private router:Router, private locationService: LocalStorageService){ 
    this.isDarkMode = !!(locationService.getData('themeMode') == 'dark');
    if(this.isDarkMode){
      document.body.classList.add('dark-theme');
    }
  }

  ngOnInit(){
    this.navigationList = [
      {displayName:'Dashboard',id:'dashboard',path:''},
      // {displayName:'Multiple Iframes',id:'multiple-iframe',path:''},
      {displayName:'Counter',id:'counter',path:'counter'},
    ]
  };

  ngAfterViewInit(){
    let loc = window.location.href;
    loc = loc.slice(loc.lastIndexOf('/')+1);
    document.getElementById(loc ? loc : 'dashboard')!.classList.add('active');
    // document.getElementsByClassName('nav-btn')[0].classList.add('active');
  };

  navigate(path:string,i:any){
    let predElem = document.getElementsByClassName('active')[0];
    predElem.classList.remove('active');
    i.target.classList.add('active');
    this.router.navigate([`${path}`]);
  }

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
    this.locationService.setData('themeMode', this.isDarkMode ? 'dark' : 'light');
  }
}

