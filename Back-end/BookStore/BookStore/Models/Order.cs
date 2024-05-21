using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class Order
    {
        [Key]
        public int orderId { get; set; }
        public string orderName { get; set; }
        public int orderQuantity { get; set; }
        public double orderPrice { get; set; }
        public string orderImage { get; set; }

        [ForeignKey("applicationUserId")]
        public string applicationUserId { get; set; }
        public virtual ApplicationUser applicationUser { get; set; }

    }
}
