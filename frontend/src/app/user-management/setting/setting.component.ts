import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { UserDetails } from '../user-details'
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  userDetails: any = {}
  activeComponent = "profile";
  constructor(
    private apiService: ApiService
  ) { 
    
    
    

  }

  ngOnInit() {
    
   this.userDetails = JSON.parse(this.apiService.getUserDetail());
   console.log(this.userDetails)
  this.activeComponent = 'profile';
  }

  changeOption(component){
    
    this.activeComponent = component;
    console.log(component)
  }
  

}
