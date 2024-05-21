using BookStore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Services
{
    public class orderService: IOrderRepository
    {
        private readonly Context context;

        public orderService(Context con)
        {
            context  = con;
        }

        public Order PostOrder(Order order)
        {
           /* ApplicationUser user = context.applicationUsers.Single(x => x.Id == order.applicationUserId);

            var addOrder = new Order
            {
                orderName = order.orderName,
                orderPrice = order.orderPrice,
                orderQuantity = order.orderQuantity,
                applicationUser = user
            };

            user.orders = new List<Order>();
            user.orders.Add(order);
            context.SaveChanges();
            return "Order Placed Succeed!";*/
            context.orders.Add(order);
            context.SaveChanges();
            var order1 = new Order
            {
                orderId = order.orderId,
                orderName = order.orderName,
                applicationUserId = order.applicationUserId,
                orderPrice = order.orderPrice,
                orderQuantity = order.orderQuantity,
                orderImage = order.orderImage
            };
            return order1;
            //return "Order Saved";
        }

        public IEnumerable<UserOrderModel> GetOrder(string userId)
        {


            return context.orders.Where(x => x.applicationUserId == userId)
                                  .Select(order => new UserOrderModel
                                  {
                                      orderId = order.orderId,
                                       UserName = order.applicationUser.UserName,
                                      OrderName = order.orderName,
                                      OrderPrice = order.orderPrice,
                                      OrderQuantity = order.orderQuantity,
                                      OrderImage =  order.orderImage
                                  })
                                  .ToList();
            //return context.orders.Include(x => x.applicationUser).Where(x => x.applicationUserId == userId).ToList();
             


        }

        public Order DeleteOrder(int Id)
        {
            var Order = context.orders.Find(Id);
            if(Order == null)
            {
                return null;
            }
            context.orders.Remove(Order);
            context.SaveChanges();
            return Order;
        }



        public Order GetLastRecord()
        {
            var order = context.orders.OrderByDescending(x => x.orderId).FirstOrDefault();
            return order;
        }

    }
}
