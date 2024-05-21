using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class Event
    {
        public int ID { set; get; }
        public string EventName { set; get; }
        public DateTime EventDate { set; get; }
        public string Country { set; get; }
        public string City { set; get; }

    }
}
