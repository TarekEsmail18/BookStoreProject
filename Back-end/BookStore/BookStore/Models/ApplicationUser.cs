using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class ApplicationUser: IdentityUser
    {
        
        public string FullName { set; get; }
        public virtual List<Order> orders { get; set; }
    }
}
