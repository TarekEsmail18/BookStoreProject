import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../ViewModel/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  orderCount: number = 0;
  orderList = new BehaviorSubject<any>([]);
  cartDetails:any = [];
  orderPrice: number = 0;

constructor(private http: HttpClient) { }




GetOrderFromDataBase(userId: string)
{
  return this.http.get(`${environment.URL}order/GetOrder` + '?userId=' + userId);
}

PlaceOrderToDataBase(orderDetails: Order)
{
  return this.http.post(`${environment.URL}order/Post`, orderDetails, {responseType: 'text'});
}

RemoveOrderFromDataBase(Id: number)
{
  return this.http.delete(`${environment.URL}order/Delete` + '?Id=' + Id);
}

GetLastOrderFromDatabase()
{
  return this.http.get(`${environment.URL}order/GetLastRecord`);
}

GetOrderData()
{
  return this.orderList.asObservable();
}

setOrder(order:any)
{
  this.cartDetails.push(...order);
  this.orderList.next(order);
}
addToCart(order:any)
{
  this.cartDetails.push(order);
  this.orderList.next(this.cartDetails);
  this.getTotalAmount();
  console.log(this.cartDetails);
}
addToCart1(order:any)
{
  order.forEach((element:any) => {
    //console.log(element)
    this.cartDetails.push(element);
    this.orderList.next(this.cartDetails);
    console.log(this.cartDetails);
  });
}
RemoveFromCart(order: any)
{
  /*this.cartDetails.map((a:any, index:any)=>{
    if(order.Id === a.orderId)
    {
      this.cartDetails.splice(index,1);
    }
  });
  this.orderList.next(this.cartDetails);
  console.log(order);*/
  let index = this.cartDetails.indexOf(order);
  this.cartDetails.splice(index,1);
  this.orderList.next(this.cartDetails);
}

getTotalAmount()
{
  let Total = 0;
  this.cartDetails.map((a:any)=>
  {
    Total += a.orderPrice;
  });
  return this.orderPrice = Total
  //console.log(this.orderPrice);
}


}
