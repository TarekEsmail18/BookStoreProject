import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../ViewModel/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorServicesService {

constructor(private httpclient: HttpClient) { }

  GetAuthor():Observable<any>
  {
    return this.httpclient.get(`${environment.URL}Author/GetAuthors`);
  }

  AddAuthor(author:Author):Observable<string>
  {
    return this.httpclient.post(`${environment.URL}Author/AddAuthor`,author,{responseType:'text'});
  }

  GetAuthorById(Id:number):Observable<any>
  {
    return this.httpclient.get(`${environment.URL}Author/GetAuthorById` + '?Id=' + Id);
  }

  UpdateAuthor(Id:number,author:Author):Observable<any>
  {
    return this.httpclient.put(`${environment.URL}Author/UpdateAuthor` + '?Id=' + Id,author,{responseType: 'text'});
    
  }

  DeleteAuthor(Id:number)
  {
    return this.httpclient.delete(`${environment.URL}Author/DeleteAuthor` + '?Id=' + Id);
  }

}
