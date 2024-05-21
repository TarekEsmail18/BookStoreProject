using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class Book
    {
        public int ID { set; get; }
        public string Name { set; get; }
        public string Categories { set; get; }
        public int Price { set; get; }
        public string Image { set; get; }

        [ForeignKey("AuthorId")]
        public int AuthorId { set; get; }
        public virtual Author Author  { set; get; }
    }
}
