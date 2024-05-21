import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/ViewModel/Events';
import { EventServicesService } from 'src/app/services/eventServices.service';

@Component({
  selector: 'app-EditEventDetails',
  templateUrl: './EditEventDetails.component.html',
  styleUrls: ['./EditEventDetails.component.css']
})
export class EditEventDetailsComponent implements OnInit {

  eventbyid: Events;



  constructor(private EventService: EventServicesService,private activateRoute: ActivatedRoute,private router: Router,public datepipe: DatePipe) {
    this.eventbyid = {};
   }

  ngOnInit() {

    const eventID = this.activateRoute.snapshot.params['Id']
    this.EventService.GetEventById(eventID).subscribe(
      (data)=>{
        this.eventbyid.id = data.id
        this.eventbyid.eventName = data.eventName,
        this.eventbyid.city = data.city,
        this.eventbyid.country = data.country,
        this.eventbyid.eventDate =this.datepipe.transform(data.eventDate,'yyyy-MM-dd')|| ''

        //this.eventbyid = data;
        console.log(this.eventbyid);
      }
    );



  }




  OnSubmit()
  {
    this.eventbyid = {
      eventName: this.eventbyid.eventName,
      eventDate: this.eventbyid.eventDate,
      city: this.eventbyid.city,
      country: this.eventbyid.country
    }
    const eventID = this.activateRoute.snapshot.params['Id']
    this.EventService.UpdateEvent(this.eventbyid,eventID).subscribe(
      (res)=>{
        this.router.navigateByUrl('/Admin/EventList');
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }



}
