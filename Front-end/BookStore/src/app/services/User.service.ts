import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../ViewModel/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Roles: string = 'User'; 
  userId: string = "";

constructor(private http: HttpClient) { }


RegisterToDataBase(user:User)
{
  return this.http.post(`${environment.URL}Auth/Register`,user);
}

Login(user:User)
{
  return this.http.post(`${environment.URL}Auth/Login`,user);
}


UserProfile()
{
  /*const httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer'+localStorage.getItem('token')
    })
  };
  var tokenHeader = new HttpHeaders({'Authorization':'Bearer'+localStorage.getItem('token')});*/
  return this.http.get(`${environment.URL}Auth/userProfile`);
}


userInfo()
{
  this.UserProfile().subscribe(
    (res: any)=>{
      this.userId = res.id;
      console.log(this.userId);
    }
  );
  return this.userId;
}




}
