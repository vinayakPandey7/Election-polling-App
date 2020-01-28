import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import  $ from 'jquery';
import { ApiService } from '../../../api.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  @Input() userDetail;
  accountForm;
  constructor(private formBuilder: FormBuilder,
    private ApiService: ApiService,
    private toastr: ToastrService

    ) { 
    console.log(this.userDetail)
  //   this.accountForm = this.formBuilder.group({
  //     username: this.userDetail.username,
  //     firstName: this.userDetail.firstname,
  //     lastName: this.userDetail.lastname
  // })
}

  ngOnInit() {
    console.log(this.userDetail)
  }

  checkAvailability(){
    let username = $('#username').val();
    this.ApiService.getAll('user/check-user-avail',username)
    .subscribe((res:any)=> {
      if (res.success == true){
        $('#username').css('background-color','green');

      } else {
        $('#username').css('background-color','red')
      }
    })
  }

  changeUsername(){
    
    let tempUsername = $('#username').val();
    let tempUserDetail:any = {
      email : this.userDetail.email,
      username : tempUsername
    }
    this.ApiService.update('user/change-username',tempUserDetail)
    .subscribe((res:any)=> {
      if (res.success == true){
       this.toastr.success('username updated successfully','Success')

      } else {
        this.toastr.warning('try again!','username is unavailable')
      }
    })
  }

}
