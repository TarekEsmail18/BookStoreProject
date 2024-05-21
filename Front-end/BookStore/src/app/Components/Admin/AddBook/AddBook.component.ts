import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorServicesService } from 'src/app/services/authorServices.service';
import { BookServicesService } from 'src/app/services/bookServices.service';
import { Book } from 'src/app/ViewModel/Book';
import { BookWithAuthorId } from 'src/app/ViewModel/BookWithAuthorId';

@Component({
  selector: 'app-AddBook',
  templateUrl: './AddBook.component.html',
  styleUrls: ['./AddBook.component.css']
})
export class AddBookComponent implements OnInit {

  BookData:BookWithAuthorId;
  BookDataToDataBase:any;
  PhotoFileName:string = "";
  PhotoFilePath:string = "";
  author:any[] = [];

  constructor(private BookServices: BookServicesService,private authorServices: AuthorServicesService ,private router: Router) {

    this.BookData = {name:"",authorId:0,categories:"",price:0};

   }

  ngOnInit() {
    this.authorServices.GetAuthor().subscribe(
      (res)=>{
        this.author = res;
        console.log(this.author);
      },
      (err)=>{
        console.log(err);
      });
    
  }

  OnSubmit()
  {

    this.BookDataToDataBase = {
      name: this.BookData.name,
      authorId: this.BookData.authorId,
      categories: this.BookData.categories,
      price: this.BookData.price,
      image: this.PhotoFileName
    }

    this.BookServices.AddBook(this.BookDataToDataBase).subscribe(
      ()=>
      {
        this.router.navigateByUrl('/Admin');
      }
    );
  }


  uploadPhoto(event: any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.BookServices.UploadPhoto(formData).subscribe((data:any)=>{
      this.PhotoFileName=data.toString();
      this.PhotoFilePath=this.BookServices.PhotoUrl+this.PhotoFileName;
      console.log(this.PhotoFileName);
    })
  }


}
