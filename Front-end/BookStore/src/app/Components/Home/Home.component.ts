import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServicesService } from 'src/app/services/bookServices.service';
import { UserService } from 'src/app/services/User.service';
import { Book } from 'src/app/ViewModel/Book';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { EventServicesService } from 'src/app/services/eventServices.service';
import { Events } from 'src/app/ViewModel/Events';
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  tab : any = 'tab1';
  tab1 : any
  tab2 : any
  tab3 : any
  tab4 : any
  tab5 : any
  tab6 : any

  img:string = "assets/images/download.jpg";

  show:any = false;

  mainBook: Book[] = [];

  BookByCat: Book[] = [];
  
  byCat:boolean = false;

  images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);

  items:any[] = [
    {imagesrc: "assets/images/slider-books.png",par: "sgjagsjahgshgajhsgjagsjahg1"},
    {imagesrc: "assets/images/slider-books1.png",par: "sgjagsjahgshgajhsgjagsjahg2"},
    {imagesrc: "assets/images/slider-books2.jpg",par: "sgjagsjahgshgajhsgjagsjahg3"},
    {imagesrc: "assets/images/slider-books3.jpg",par: "sgjagsjahgshgajhsgjagsjahg4"}
  ];    

  index = 0;

  intervaleTime = 10000;

  author:any[] = [
    {img:"../../../assets/images/team-1.png",title: "AUTHOR"},
    {img: "../../../assets/images/team-2.png",title:"DESIGNER"},
    {img: "../../../assets/images/team-3.png",title:"CONSULTANT"},
    {img: "../../../assets/images/team-4.png",title:"SUPPORT"}
  ];

  eventList: Events[] = [];



  constructor(private bookServices: BookServicesService, private router: Router,private userservice: UserService,private config: NgbCarouselConfig, private eventService: EventServicesService ) {
    config.interval = 0;
		config.wrap = true;
		config.keyboard = false;
		config.pauseOnHover = true;
  }

  ngOnInit(): void {
    this.bookServices.getBookFromDataBase().subscribe(
      (data)=>{
        this.mainBook = data;
      }
    );


    this.userservice.UserProfile().subscribe(
      (res)=>
      {
        //console.log(res);
      },
      (err)=>
      {
        //console.log(localStorage.getItem('token'));
        console.log(err);
      });
    


      this.AutoSlide();

      this.eventService.GetEventFromDatabase().subscribe(
        (res) =>
        {
          this.eventList = res;
        },
        (err)=>
        {
          console.log(err);
        }
        );
      


  }

  ShowLink()
  {
    this.show = true;
  }  
  HiddenLink()
  {
    this.show = false;
  }

  GetBookByCat(Cat:string)
  {
    this.bookServices.getBookByCatFromDataBase(Cat).subscribe(
      (data)=>{
        this.BookByCat = data;
        //console.log(this.BookByCat);
        //this.router.navigateByUrl("");
      }
      );
      this.byCat = true;

  }

  ShowAllBook()
  {
    this.byCat = false;
  }


  active(check:any)
  {
    if(check==1){
      this.tab = 'tab1';
    }else if(check==2){
      this.tab = 'tab2';
    }else if(check==3){
      this.tab = 'tab3';
    }else if(check==4){
      this.tab = 'tab4';
    }else if(check==5){
      this.tab = 'tab5';
    }else{
      this.tab = 'tab6';
    }
  }




  goToDetails(Id:any)
  {
    this.router.navigateByUrl('bookDetails/' + Id);
  }

  OnPrevSelect()
  {
    if(this.index === 0)
    {
      this.index = this.items.length - 1;
    }
    else
    {
      this.index--;
    }
  }
  OnNextClick()
  {
    if(this.index === this.images.length - 1)
    {
      this.index = 0;
    }
    else
    {
      this.index++;
    }
  }
  AutoSlide()
  {
    setInterval(()=>{
      this.OnNextClick();
    },this.intervaleTime);
  }
  selectItem(i: number)
  {
    this.index = i;
  }
}
