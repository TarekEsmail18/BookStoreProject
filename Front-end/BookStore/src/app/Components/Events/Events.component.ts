
import { Component, OnInit } from '@angular/core';
import { EventServicesService } from 'src/app/services/eventServices.service';
import { DatePipe } from '@angular/common'
import { Events } from 'src/app/ViewModel/Events';
@Component({
  selector: 'app-Events',
  templateUrl: './Events.component.html',
  styleUrls: ['./Events.component.css']
})
export class EventsComponent implements OnInit {

  eventList: Events[] = [{}];
  finalList: Events[] = [];
  error:string = "";
  date:string = "";
  finalDate:string = "";

  constructor(private eventServices: EventServicesService,public datepipe: DatePipe) { 
  }

  ngOnInit() {

    this.eventServices.GetEventFromDatabase().subscribe(
      res=>
      {
        if(res.length >= 1)
        {
          for(let i = 0; i < res.length; i++)
          {
            this.date = res[i].eventDate.split("T");
            this.finalDate = this.datepipe.transform(this.date[0],'dd.MM.yyyy')|| '';
            this.eventList[i].eventDate = this.finalDate;
            this.eventList[i].eventName = res[i].eventName;
            this.eventList[i].city = res[i].city;
            this.eventList[i].country = res[i].country;
          }
        }
        else
        {
          this.eventList = [];
        }
      },
      err=>
      {
        this.eventList = []
        if(err.status == 404)
        {
          this.error = err.error;
        }
        else
        {
          console.log(err);
        }

      });


  }

}
