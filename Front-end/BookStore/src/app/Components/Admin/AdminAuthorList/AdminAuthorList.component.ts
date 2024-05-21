import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/ViewModel/Author';
import { AuthorServicesService } from 'src/app/services/authorServices.service';

@Component({
  selector: 'app-AdminAuthorList',
  templateUrl: './AdminAuthorList.component.html',
  styleUrls: ['./AdminAuthorList.component.css']
})
export class AdminAuthorListComponent implements OnInit {

  authorList: Author[] = [];
  authorbyid: Author;
  PhotoFilePath: string = "";
  authorId:any;
  constructor(private router: Router, private el: ElementRef, private authorServices: AuthorServicesService) {
    this.authorbyid = {age:10,country:"",dateOfBirth:"",name:""}
   }

  ngOnInit() {
    this.authorServices.GetAuthor().subscribe(
      (data)=>
      {
        this.authorList = data;
      });
  }

  gotoDetails(authorId: any)
  {
    this.router.navigateByUrl('Admin/AuthorDetails/' + authorId);
  }

  DeleteAuthor(id: any)
  {
    let element = this.el.nativeElement.querySelector('.confirm-delete-outer');
    element.classList.add('show');
    this.authorId = id;
  }
  GotoAddAuthorPage()
  {
    this.router.navigateByUrl('Admin/AddAuthor');
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
     this.authorServices.DeleteAuthor(this.authorId).subscribe(
      (data)=>
      {
        this.authorServices.GetAuthor().subscribe(
          (data)=>
          {
            this.authorList = data;
          }
        );
      }
    );
  }





}
