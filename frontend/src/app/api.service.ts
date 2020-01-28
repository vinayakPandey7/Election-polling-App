import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from './user-management/user-details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  data = [];
  a;
  URL = "http://localhost:3000/";
  loggedIn : Boolean = false;
  userDetails: any = {
    username: String,
    firstname: String,
    lastname: String,
    age:Number,
    email: String
  }

  constructor(
    private http: HttpClient
  ) { }

   getAll(link,param){
    return this.http.get(this.URL+link+'/'+param)
   }

   login(link,userData){
    return this.http.post(this.URL+link,userData);
   }

   postData(link,userData){
    return this.http.post(this.URL+link,userData);
   }

   update(link,object){
    return this.http.put(this.URL+link,object)
   }

   setUserDetail(userDetail){
     this.userDetails = userDetail;
   }

   getUserDetail(){
    return  localStorage.getItem('userDetail');
  }

   getAllUserDetail(link): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.URL+link);
   }

   delete(link:String){
     return this.http.delete(this.URL+link)
   }


}

