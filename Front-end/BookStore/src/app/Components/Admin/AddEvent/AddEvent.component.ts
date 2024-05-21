import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/ViewModel/Events';
import { EventServicesService } from 'src/app/services/eventServices.service';

@Component({
  selector: 'app-AddEvent',
  templateUrl: './AddEvent.component.html',
  styleUrls: ['./AddEvent.component.css']
})
export class AddEventComponent implements OnInit {

  eventData:Events;
  eventDataToDataBase:any;


  constructor(private eventService: EventServicesService,private router: Router) {
    this.eventData = {};
   }

  ngOnInit() {

  }



  OnSubmit()
  {

    this.eventDataToDataBase = {
      eventName: this.eventData.eventName,
      eventDate: this.eventData.eventDate,
      city: this.eventData.city,
      country: this.eventData.country
    }

    this.eventService.AddEvent(this.eventDataToDataBase).subscribe(
      ()=>
      {
        this.router.navigateByUrl('Admin/EventList');
      }
    );
  }






}
