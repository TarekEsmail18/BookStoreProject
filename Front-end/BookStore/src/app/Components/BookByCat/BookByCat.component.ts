import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookServicesService } from 'src/app/services/bookServices.service';
import { Book } from 'src/app/ViewModel/Book';

@Component({
  selector: 'app-BookByCat',
  templateUrl: './BookByCat.component.html',
  styleUrls: ['./BookByCat.component.css']
})
export class BookByCatComponent implements OnInit {


  BookByCat: Book[] = [];

  constructor(private bookServices: BookServicesService, private activateRoute: ActivatedRoute) {  }

  ngOnInit() {

    const Cat = this.activateRoute.snapshot.params['Cat'];
    this.bookServices.getBookByCatFromDataBase(Cat).subscribe(
      (data)=>{
        this.BookByCat = data;
        console.log(this.BookByCat);
      }
      );

  }



  GetBookByCat()
  {
    const Cat = this.activateRoute.snapshot.params['Cat'];
    this.bookServices.getBookByCatFromDataBase(Cat).subscribe(
      (data)=>{
        this.BookByCat = data;
        console.log(this.BookByCat);
      }
      );
  }

}
