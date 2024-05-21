using BookStore.Models;
using BookStore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Controllers
{
    [Route("Events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository IeventRepository;
        public EventsController(IEventRepository _IeventRepository)
        {
            IeventRepository = _IeventRepository;
        }

        [HttpGet]
        [Route("GetAllEvents")]
        public ActionResult<Event> GetEvents()
        {
            var events = IeventRepository.GetEvents();
            if (events == null || !events.Any())
            {
                return NotFound("No Events Available Now!");
            }

            return Ok(events);    
        }

        [HttpGet("Id")]
        [Route("GetById")]

        public Event GetById(int Id)
        {
            return this.IeventRepository.GetById(Id);
        }



        [HttpPost]
        [Route("AddEvent")]
        public ActionResult AddEvent(Event ev)
        {
            if(ev == null)
            {
                return NotFound("There Is No Event To Add");
            }
            else
            {
                return Ok(this.IeventRepository.AddEvents(ev));
            }
        }


        [HttpPut("Id")]
        [Route("UpdateEvent")]
        public ActionResult UpdateEvent(int Id,Event ev)
        {
            if(ev != null)
            {
                
                return Ok(this.IeventRepository.UpdateEvent(Id, ev));
            }
            else
            {
                return NotFound();
            }
        }


        [HttpDelete("Id")]
        [Route("DeleteEvent")]
        public ActionResult DelteEvent(int Id)
        {
            if (Id != 0)
            {

                return Ok(this.IeventRepository.DeleteEvent(Id));
            }
            else
            {
                return NotFound();
            }
        }

    }
}
