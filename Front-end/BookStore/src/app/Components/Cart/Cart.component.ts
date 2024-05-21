import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/Order.service';
import { UserService } from 'src/app/services/User.service';
import { Order } from 'src/app/ViewModel/Order';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.css']
})
export class CartComponent implements OnInit {

  orderData: any[] = [];
  userId: string = '';
  constructor(private orderservice: OrderService,private userservice: UserService) {
    //this.orderData = {applicationUserId: '',orderName: '',orderPrice: 0,orderQuantity: 0 }
   }


  ngOnInit() {


    
    this.orderservice.GetOrderData().subscribe(
      res=>{
        this.orderData = res;
        console.log(this.orderData);
      }
    );
      console.log(this.orderData);


    /*this.userservice.UserProfile().subscribe(
      (res: any)=>{
        this.userId = res.id;
        this.orderservice.GetOrderFromDataBase(this.userId).subscribe(
          (res:any)=>{
            this.orderData = res;
            console.log(this.orderData);
          },
          err=>{
            console.log(err);
          }
        );

      },
      err=>{
        console.log(err);
      }
    );*/


   
  }

  DeleteOrder(order: any)
  {
    this.orderservice.RemoveOrderFromDataBase(order.orderId).subscribe(
      (res)=>{
        this.orderservice.RemoveFromCart(order);
      },
      (err)=>{
        console.log(err)
      });
    console.log(order);
  }



}
