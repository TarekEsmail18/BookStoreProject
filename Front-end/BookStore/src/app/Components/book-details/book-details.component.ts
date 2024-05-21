import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServicesService } from 'src/app/services/bookServices.service';
import { OrderService } from 'src/app/services/Order.service';
import { UserService } from 'src/app/services/User.service';
import { Book } from 'src/app/ViewModel/Book';
import { Order } from 'src/app/ViewModel/Order';
import { HeaderComponent } from '../Header/Header.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  
  img:string = "assets/images/download.jpg";
  bookData: Book;
  order: Order; 
  order1: any;


  constructor(private bookServices: BookServicesService, private activateRoute: ActivatedRoute,private orderservice: OrderService, private userservice: UserService, private router: Router) { 
    this.bookData = {id:0,name:"",author:"",categories:"",price:0};
    this.order = {applicationUserId: "",orderName:"",orderPrice:0,orderQuantity:0};
  }

  ngOnInit() {
    const bookID = this.activateRoute.snapshot.params['id'];
    this.bookServices.getBookByIdFromDataBase(bookID).subscribe(
      (data)=>{
        this.bookData = data;
      }
    );

  }

  

  AddToCart()
  {
     this.order = {
      applicationUserId: this.userservice.userId,
      orderName: this.bookData.name,
      orderPrice: this.bookData.price,
      orderQuantity: 1
    }


    //this.orderservice.orderCount++;
    //console.log(this.orderservice.orderCount);
    this.orderservice.PlaceOrderToDataBase(this.order).subscribe(
      (res)=>{
        console.log(res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }


  AddToCart2()
  {
    this.order = {
      applicationUserId: this.userservice.userId,
      orderName: this.bookData.name,
      orderPrice: this.bookData.price,
      orderQuantity: 1,
      orderImage: this.bookData.image
    }

    //this.orderservice.addToCart(this.order);
    if(localStorage.getItem('token') != null)
    {
      this.orderservice.PlaceOrderToDataBase(this.order).subscribe(
        (res)=>{
         /*this.order1 = {
            applicationUserId: res.applicationUserId,
            orderName: res.orderName,
            orderPrice: res.orderPrice,
            orderQuantity: res.orderQuantity
          }
          console.log(res);
          //console.log('order1' + this.order1);
          this.orderservice.addToCart(res);*/
          this.orderservice.GetLastOrderFromDatabase().subscribe(
            res=>{
              this.orderservice.addToCart(res);
              console.log(res);
            },
            err=>{
              console.log(err);
            });
         
        },
        (err)=>{
          console.log(err);
        }
        );
    }
    else
    {
      this.router.navigateByUrl('login');
    }




  }





}
