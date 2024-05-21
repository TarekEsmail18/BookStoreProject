using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Services
{
    public interface IEventRepository
    {
        public IEnumerable<Event> GetEvents();
        public Event GetById(int Id);
        public string AddEvents(Event ev);
        public string UpdateEvent(int Id, Event EvData);
        public string DeleteEvent(int Id);
    }
}
