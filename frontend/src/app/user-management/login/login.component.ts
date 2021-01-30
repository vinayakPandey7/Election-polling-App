import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../api.service'
import { Router  } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm;


  constructor(
    private formBuilder : FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
  ){ 
      this.loginForm = this.formBuilder.group({
        username: '',
        password: '',
      })

  }

  onSubmit(userData){
    
    // check validity of form if not valid prevent from submitting
    if(userData.username == '' || userData.password == '') {
      this.toastr.warning("fields must not be empty")
      return false}

    this.apiService.login('api/user/login',userData)
    .subscribe((res:any)=> {
      
      if (res.success == true) {
        // this.apiService.loggedIn = true;
        let tempUserDetail = res.userDetail;
        this.apiService.userDetails.a = 'avc'
        localStorage.setItem('userDetail',JSON.stringify(tempUserDetail));
        localStorage.setItem('access_token', JSON.stringify(res.access_token));
        this.loginForm.reset();
        this.router.navigate(['/setting']);
        this.toastr.success("welcome "+tempUserDetail.firstname)
        
      }else  {
        this.loginForm.reset();
        this.toastr.warning("try again!","wrong credentials")
  
      }
    })
  }

  ngOnInit() {
    
  }

}
