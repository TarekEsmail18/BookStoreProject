using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models
{
    public class pageParam
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public pageParam()
        {
            this.PageNumber = 1;
            this.PageSize = 10;
        }
        public pageParam(int pageNumber, int pageSize)
        {
            this.PageNumber = pageNumber < 1 ? 1 : pageNumber;
            this.PageSize = pageSize > 10 ? 10 : pageSize;
        }
    }
}
