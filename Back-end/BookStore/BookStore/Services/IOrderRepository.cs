using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Services
{
    public interface IOrderRepository
    {
        Order PostOrder(Order order);
        IEnumerable<UserOrderModel> GetOrder(string userId);
        public Order DeleteOrder(int Id);
        Order GetLastRecord();
    }
}
