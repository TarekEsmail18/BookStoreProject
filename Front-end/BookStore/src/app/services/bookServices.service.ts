import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../ViewModel/Book';
import { BookWithAuthorId } from '../ViewModel/BookWithAuthorId';

@Injectable({
  providedIn: 'root'
})
export class BookServicesService {


  readonly PhotoUrl = "http://localhost:53535/Images/";

constructor(private httpclient: HttpClient) {}

  getBookFromDataBase():Observable<any>
  {
    return this.httpclient.get(`${environment.URL}book/get`);
  }

  getBookByIdFromDataBase(Id:number):Observable<any>
  {
    return this.httpclient.get(`${environment.URL}book/GetById` + '?Id=' + Id);
  }

  getBookByCatFromDataBase(Cat:string):Observable<any>
  {
    return this.httpclient.get(`${environment.URL}book/GetByCat` + '?Cat=' + Cat);
  }

  getNumberOfPages(NumberOfBookShowBerPage:Number):Observable<any>
  {
    return this.httpclient.get(`${environment.URL}book/CountOfPage` + '?NumberOfBookShowBerPage=' + NumberOfBookShowBerPage);
  }

  getProductPages(PageNumber: number,PageSize:number):Observable<any>
  {
    const params = new HttpParams()
                                  .set('PageNumber', PageNumber.toString())
                                  .set('PageSize',PageSize.toString());
    return this.httpclient.get(`${environment.URL}book/BookOfPages`,{params});
  }




  DeleteBookById(id: number)
  {
    return this.httpclient.delete(`${environment.URL}book/Delete` + '?id=' + id);
  }

  AddBook(book: Book)
  {
    return this.httpclient.post(`${environment.URL}book/Post`,book,{responseType: 'text'});
  }

  UpdateBook(id: number, book: BookWithAuthorId)
  {
    return this.httpclient.put(`${environment.URL}book/Put` + '?id=' + id,book,{responseType: 'text'});
  }

  UploadPhoto(val: any)
  {
    return this.httpclient.post(`${environment.URL}book/SaveFile`,val);
  }
}
