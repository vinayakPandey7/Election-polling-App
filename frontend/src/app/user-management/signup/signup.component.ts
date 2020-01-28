import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm;
  constructor( 
    private formBuilder : FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    ) {
      
     
     }

  ngOnInit() {

     this.signupForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        age: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        location: ['', Validators.required]
      })

  }

  onSubmit(userData:any){
    console.log(userData)
// return;
    // check validity of form if not valid prevent from submitting
    

    this.apiService.login('api/user/add-user',userData)
    .subscribe((res:any)=> {
      
      if (res.success == true) {
        console.log(res)
        this.router.navigate(['/login']);
        this.signupForm.reset();
        this.toastr.success("User Created Successfully!","Success!")
      }else  {
        this.signupForm.reset();
        this.toastr.warning("try again!","wrong credentials")
      }
    })
  }

}
