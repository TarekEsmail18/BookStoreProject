using BookStore.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Services
{
    public class EventService : IEventRepository
    {

        private readonly Context context;
        public EventService(Context con)
        {
            context = con;
        }
        public IEnumerable<Event> GetEvents()
        {
            return context.events.Select(ev => new Event
            {
                ID = ev.ID,
                EventName = ev.EventName,
                City = ev.City,
                Country = ev.Country,
                EventDate = ev.EventDate,
            }).ToList();


        }


        public Event GetById(int Id)
        {
            return context.events.Where(x => x.ID == Id)
                                .Select(ev => new Event
                                {
                                    ID = ev.ID,
                                    EventName = ev.EventName,
                                    EventDate = ev.EventDate,
                                    Country = ev.Country,
                                    City = ev.City
                                })
                                .FirstOrDefault();
        }


        public string AddEvents(Event ev)
        {
            this.context.events.Add(ev);
            context.SaveChanges();
            return "Event Added Succ";
        }

        public string UpdateEvent(int Id,Event EvData)
        {
            Event ev = this.context.events.Find(Id);
            if(ev != null)
            {
                ev.City = EvData.City;
                ev.Country = EvData.Country;
                ev.EventName = EvData.EventName;
                ev.EventDate = EvData.EventDate;
                context.SaveChanges();
                return "Update Succ.......!";
            }
            else
            {
                return " Can't Find Event";
            }
        }


        public string DeleteEvent(int Id)
        {
            Event ev = this.context.events.Find(Id);
            if(ev != null)
            {
                this.context.events.Remove(ev);
                context.SaveChanges();
                return "Deleted......!";
            }
            else
            {
                return " Can't Find Event";
            }
        }


    }
}
