import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/ViewModel/Events';
import { EventServicesService } from 'src/app/services/eventServices.service';

@Component({
  selector: 'app-AdminEventList',
  templateUrl: './AdminEventList.component.html',
  styleUrls: ['./AdminEventList.component.css']
})
export class AdminEventListComponent implements OnInit {


  eventList: Events[] = [];
  eventbyid: Events;
  eventId:any;




  constructor(private eventServices: EventServicesService, private router: Router, private el: ElementRef) { 
    this.eventbyid = {};
  }

  ngOnInit() {

    this.eventServices.GetEventFromDatabase().subscribe(
      (data)=>
      {
        this.eventList = data;
      });
  }





  gotoDetails(eventId: any)
  {
    this.router.navigateByUrl('Admin/EventDetails/' + eventId);
  }

  DeleteEvent(id: any)
  {
    let element = this.el.nativeElement.querySelector('.confirm-delete-outer');
    element.classList.add('show');
    this.eventId = id;
  }
  GotoAddEventPage()
  {
    this.router.navigateByUrl('Admin/AddEvent');
  }


  closeAlert()
  {
    let element = this.el.nativeElement.querySelector('.confirm-delete-outer');
    element.classList.remove('show');
  }

  DeleteElement()
  {
    let element = this.el.nativeElement.querySelector('.confirm-delete-outer');
    element.classList.remove('show');
     this.eventServices.DeleteEventById(this.eventId).subscribe(
      (data)=>
      {
        this.eventServices.GetEventFromDatabase().subscribe(
          (da)=>
          {
            this.eventList = da;
          }
        );
      },
      (err)=>{
        console.log(err);
      }
    );
  }

}
