import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServicesService } from 'src/app/services/bookServices.service';
import { Book } from 'src/app/ViewModel/Book';

@Component({
  selector: 'app-AdminBookList',
  templateUrl: './AdminBookList.component.html',
  styleUrls: ['./AdminBookList.component.css']
})
export class AdminBookListComponent implements OnInit {

  img:string = "assets/images/download.jpg";
  bookList: Book[] = [];
  bookbyid: Book;
  PhotoFilePath: string = "";
  bookId:any;
  constructor(private bookServices: BookServicesService, private router: Router, private el: ElementRef) { 
    this.bookbyid = {id:0,name:"",author:"",categories:"",price:0};
  }

  ngOnInit() {
     this.bookServices.getBookFromDataBase().subscribe(
      (data)=>
      {
        this.bookList = data;
      });
      

        
        
        
  }
  gotoDetails(bookId: any)
  {
    this.router.navigateByUrl('Admin/BookDetails/' + bookId);
  }

  DeleteBook(id: any)
  {
    let element = this.el.nativeElement.querySelector('.confirm-delete-outer');
    element.classList.add('show');
    this.bookId = id;
    /*this.bookServices.DeleteBookById(id).subscribe(
      (data)=>
      {
        this.bookServices.getBookFromDataBase().subscribe(
          (da)=>
          {
            this.bookList = da;
          }
        );
      }
    );*/
  }
  GotoAddBookPage()
  {
    this.router.navigateByUrl('Admin/AddBook');
  }


  closeAlert()
  {
    let element = this.el.nativeElement.querySelector('.confirm-delete-outer');
    element.classList.remove('show');
  }

  DeleteElement()
  {
    let element = this.el.nativeElement.querySelector('.confirm-delete-outer');
    element.classList.remove('show');
     this.bookServices.DeleteBookById(this.bookId).subscribe(
      (data)=>
      {
        this.bookServices.getBookFromDataBase().subscribe(
          (da)=>
          {
            this.bookList = da;
          }
        );
      }
    );
  }


}
