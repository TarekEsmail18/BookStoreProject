﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class OrderDetails
    {
        public string OrderName { get; set; }
        public int Quantity { get; set; }
        public double price { get; set; }

    }
}
