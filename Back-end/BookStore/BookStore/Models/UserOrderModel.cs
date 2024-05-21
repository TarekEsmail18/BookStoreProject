using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class UserOrderModel
    {
        public int orderId { get; set; }
        public string UserName { get; set; }
        public string OrderName { get; set; }
        public int OrderQuantity { get; set; }
        public double OrderPrice { get; set; }
        public string OrderImage { get; set; }

    }
}
