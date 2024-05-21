import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/ViewModel/Book';
import { BookServicesService } from 'src/app/services/bookServices.service';

@Component({
  selector: 'app-ProductList',
  templateUrl: './ProductList.component.html',
  styleUrls: ['./ProductList.component.css'],
  animations: [
    trigger('enterAnimation', [
      
      transition('void => *', [
        style({opacity:0,right:'-500px'}),
        animate('0.6.5s',style({opacity:1,right:0}))
      ]),
      transition('* => void', [
        animate('0.6.5s',style({opacity: 0,right:'-500px'}))
      ])
    ]),
    trigger('hoverAnimation', [
      
      transition(':enter', [
        /*style({opacity:0}),*/
        style({opacity:0}),
        animate('0.4s',style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('0.4s',style({opacity: 0}))
      ])
    ])
  ],
})
export class ProductListComponent implements OnInit {


  img:string = "assets/images/download.jpg";
  show:boolean = false;
  //count:number = 5;
  arr:number[] = [];
  active:number = 0;
  NumberOfPages:any;
  pagePram =  {
    PageNumber: this.active,
    PageSize: 12
  };

  BookPerPageList:Book[] = [];


  constructor(private bookServices: BookServicesService) { 
    
   
  }

  ngOnInit() {
    this.bookServices.getNumberOfPages(this.pagePram.PageSize).subscribe(
      (res)=>{
        this.NumberOfPages = res;
        this.countnumberOfPages(this.NumberOfPages);
        let x = this.arr[this.arr.length-1];
        console.log('length: '+ x);
        console.log('this is x = ' + this.NumberOfPages);
      
      },
      (err)=>
      {
        console.log(err);
      });


      this.bookServices.getProductPages(this.active,this.pagePram.PageSize).subscribe(
        (res)=>{
          console.log(res);
          this.BookPerPageList = res;
        console.log('book list' + this.BookPerPageList);
        },
        (err)=>
        {
          console.log('error=:= ' + err);
        });

  }






  countnumberOfPages(NumberOfPages:number)
  {
    for (let i= 1; i < NumberOfPages; i++) {
      this.arr[i] = i;
      console.log(this.arr);
    }
    console.log('this is number of page' + this.active);
  }




  activeFunNext()
  {
    this.active++;
    console.log('this is number of page ' + this.active);
    this.GetBooksPerPage();
  }

  activeFunNumbers()
  {
    this.GetBooksPerPage();
  }

  
  activeFunPrev()
  {
    this.active--;
    console.log('this is number of page ' + this.active);
    this.GetBooksPerPage();
  }




  GetBooksPerPage()
  {
    this.bookServices.getProductPages(this.active,this.pagePram.PageSize).subscribe(
      (res)=>{
        console.log(res);
        this.BookPerPageList = res;
        console.log('book list' + this.BookPerPageList);
      },
      (err)=>
      {
        console.log('error=:= ' + err);
      });
  }



}
