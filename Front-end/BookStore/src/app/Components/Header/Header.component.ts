import { Component, HostListener, OnInit,ElementRef, SimpleChanges, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/Order.service';
import { UserService } from 'src/app/services/User.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css'],
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
        style({top: '155%',opacity:0}),
        animate('0.4s',style({top: '158%',opacity: 1}))
      ]),
      transition(':leave', [
        animate('0.4s',style({top: '150%', opacity: 0}))
      ])
    ])
  ],
})
export class HeaderComponent implements OnInit {
  isOpen = true;
  show:boolean = false;
  showSearch:boolean = false;
  showMessage:boolean = false;
  logoImg:string = "assets/images/logo.png"; 
  Admin: boolean = false;
  User: boolean = true;
  IsAdmin: boolean = false;
  Roles: any;
  IsLogged: boolean = false;
  userData: any;
  image: string =  "assets/images/download.jpg";
  orderCount: number = 0;
  orderNumber: number = 0;
  userId: string = '';
  order:any = [];
  orderPrice: number = 0;
  activeIndex: number = 0;
  constructor(public userservice: UserService,private router: Router,public orderservice: OrderService) { }

  ngOnInit() {
    this.userservice.UserProfile().subscribe(
      (res: any)=>
      {
        //console.log(res);
        this.userData = res;
        this.userservice.userId = res.id;
        this.userId = res.id;
        this.Roles = res.userRoles.join();
        //console.log(this.Roles);
        this.whatRoles(this.Roles);
        if(res != null)
        {
          this.IsLogged = true;
        }



      //console.log(this.userId);
      this.orderservice.GetOrderFromDataBase(this.userId).subscribe(
        (res:any)=>{
          //console.log(res);
          //console.log(this.userId);
          //this.order = res;
          res.forEach((element:any) => {
            //console.log(element)
            this.orderservice.cartDetails.push(element);
            this.orderservice.orderList.next(this.orderservice.cartDetails);
            console.log(this.orderservice.cartDetails);
          });

          

            /*let Total = 0;
            this.orderservice.cartDetails.map((a:any)=>
            {
              Total += a.orderPrice;
            });
            this.orderPrice = Total
            console.log(this.orderPrice);*/



        },
        err=>{
          console.log(err);
        }

      );
        
      },
      (err)=>
      {
        console.log(err);
      });

      /*this.orderCount = this.orderservice.orderCount;
      console.log(this.orderCount);*/
      //console.log(this.userData.id);
      //console.log(this.userId)
      //console.log(this.userservice.userId)
      /*this.orderservice.GetOrderFromDataBase(this.userId).subscribe(
        (res:any)=>{
          //console.log(res);
          console.log(this.userId);
          //this.order = res;
          res.forEach((element:any) => {
            //console.log(element)
            this.orderservice.cartDetails.push(element);
            this.orderservice.orderList.next(this.orderservice.cartDetails);
            //console.log(this.orderservice.cartDetails);
          });

        },
        err=>{
          console.log(err);
        }

      );*/

      this.orderservice.GetOrderData().subscribe(
        res=>{
          this.orderNumber = res.length;
          this.order = res;
          //console.log(this.order);
          this.orderPrice = this.orderservice.getTotalAmount();
          //console.log(this.orderPrice);
          //console.log(this.orderservice.orderPrice);
        }
      );
        //console.log(this.order);

        console.log(this.activeIndex + 'activeIndex');
    }
    
    
  DeleteOrder(order: any)
  {
    this.orderservice.RemoveOrderFromDataBase(order.orderId).subscribe(
      (res)=>{
        /*this.orderservice.GetOrderFromDataBase(this.userId).subscribe(
          (res:any)=>{
            res.forEach((element:any) => {
              this.orderservice.cartDetails.push(element);
              this.orderservice.orderList.next(this.orderservice.cartDetails);
              console.log(this.orderservice.cartDetails);
            });
            this.orderservice.GetOrderData().subscribe(
              res=>{
                this.orderNumber = res.length;
                this.order = res;
                this.orderPrice = this.orderservice.getTotalAmount();
              }
            );
        },
        err=>{
          console.log(err);
        });*/
      },
      (err)=>{
        console.log(err)
      });
    console.log(order);
    this.orderservice.RemoveFromCart(order);
  }



  showdiv()
  {
    this.show = true; 
  };


  
  hiddendiv()
  {
    this.show = false;
  }
  funShow()
  {
    this.showSearch = !this.showSearch;
  }
  funShowMessage()
  {
    this.showMessage = true;
    this.IsAdmin = true;
  }
  hiddenMessage()
  {
    this.showMessage = false;
    this.IsAdmin = false;
  }
  whatRoles(Roles: any)
  {
      if(Roles == 'Admin')
      {
        this.User = false;
        this.Admin = true;
      }
      else
      {
        this.IsAdmin = false;
        this.User = true;
        this.Admin = false;
      }

  }

  LogOut()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(()=>{window.location.reload()});
  }


  


}
