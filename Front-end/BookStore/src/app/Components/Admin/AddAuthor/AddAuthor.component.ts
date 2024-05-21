import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/ViewModel/Author';
import { AuthorServicesService } from 'src/app/services/authorServices.service';
import { BookServicesService } from 'src/app/services/bookServices.service';

@Component({
  selector: 'app-AddAuthor',
  templateUrl: './AddAuthor.component.html',
  styleUrls: ['./AddAuthor.component.css']
})
export class AddAuthorComponent implements OnInit {

  AuthorData:Author;
  AuthorToDataBase:any;
  Books:any[] = [];



  constructor(private BookServices: BookServicesService,private authorServices: AuthorServicesService ,private router: Router) {
    this.AuthorData = {name:"",age: 0, country:"",dateOfBirth:"12/12/2000",bookId:0}
   }

  ngOnInit() {

    this.BookServices.getBookFromDataBase().subscribe(
      (res)=>{
        this.Books = res;
        console.log(this.Books);
      },
      (err)=>{
        console.log(err);
      });

  }


  OnSubmit()
  {

    this.AuthorToDataBase = {
      name: this.AuthorData.name,
      country: this.AuthorData.country,
      age: this.AuthorData.age,
      dateofbirth: this.AuthorData.dateOfBirth,
      bookid: this.AuthorData.bookId
    }

    this.authorServices.AddAuthor(this.AuthorToDataBase).subscribe(
      ()=>
      {
        this.router.navigateByUrl('/Admin/AuthorList');
      }
    );
  }



}
