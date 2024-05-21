using BookStore.Models;
using BookStore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Controllers
{
    [Route("order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository orderRepository;
        private readonly Context context;
        public OrderController(IOrderRepository orderRepo,Context co)
        {
            this.orderRepository = orderRepo;
            context = co;
        }


        [HttpPost]
        [Route("Post")]
        public IActionResult Post(Order order)
        {
            if (order == null)
            {
                return BadRequest("No Value Enter");
            }
            else
            {
                return Ok(orderRepository.PostOrder(order));
            }

        }


        [HttpGet("userId")]
        [Route("GetOrder")]
        public IActionResult GetOrder(string userId)
        {
            return Ok(orderRepository.GetOrder(userId));
        }



        [HttpGet("userId")]
        [Route("find")]
        public ApplicationUser Getall(string userId)
        { 

            var user =  context.applicationUsers.Include(x => x.orders).SingleOrDefault(x=>x.Id == userId);
            return user;
            
        }



        [HttpDelete("Id")]
        [Route("Delete")]
        public IActionResult DeleteOrder(int Id)
        {
            var order = orderRepository.DeleteOrder(Id);
            if(order == null)
            {
                return BadRequest("Not Found!");
            }
            return Ok(order);
        }


        [HttpGet]
        [Route("GetLastRecord")]
        public Order GetLastRecord()
        {
            return orderRepository.GetLastRecord();
        }


    }
}
