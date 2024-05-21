import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/ViewModel/Author';
import { AuthorServicesService } from 'src/app/services/authorServices.service';
import { BookServicesService } from 'src/app/services/bookServices.service';

@Component({
  selector: 'app-EditAuthorDetails',
  templateUrl: './EditAuthorDetails.component.html',
  styleUrls: ['./EditAuthorDetails.component.css']
})
export class EditAuthorDetailsComponent implements OnInit {


  authorById: Author;
  Books:any[] = [];
  book:any = [];
  ownBook:string = "";

  constructor(private activateRoute: ActivatedRoute,private bookServices: BookServicesService,private authorservices: AuthorServicesService ,private router: Router) { 
    this.authorById = {name:"",age:0,country:"",dateOfBirth:"",book:""};
  }

  ngOnInit() {

    const AuthorID = this.activateRoute.snapshot.params['Id'];
    this.authorservices.GetAuthorById(AuthorID).subscribe(
      (data)=>{

        for (let i = 0; i < data.books.length; i++) {
          const element = data.books[i].name;
          this.ownBook = element
        }

        this.authorById = 
        {
          name: data.name,
          age: data.age,
          country: data.country,
          dateOfBirth: data.dateOfBirth,
          
          book: this.ownBook
        }
       // this.authorById = data;
        console.log(this.authorById);
      }
    );

      this.bookServices.getBookFromDataBase().subscribe(
        res=>{
          this.Books = res;
          console.log(this.Books);
        },
        err=>{
          console.log(err);
        });


  }



  OnSubmit()
  {
    this.authorById = {
      name: this.authorById.name,
      country: this.authorById.country,
      age: this.authorById.age,
      dateOfBirth: this.authorById.dateOfBirth,
    }
    const authorID = this.activateRoute.snapshot.params['Id']
    this.authorservices.UpdateAuthor(authorID,this.authorById).subscribe(
      (res)=>{
        this.router.navigateByUrl('/Admin/AuthorList');
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }




}
