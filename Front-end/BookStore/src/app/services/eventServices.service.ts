import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Events } from '../ViewModel/Events';

@Injectable({
  providedIn: 'root'
})
export class EventServicesService {

constructor(private http: HttpClient) { }



GetEventFromDatabase():Observable<any>
{
  return this.http.get(`${environment.URL}Events/GetAllEvents`);
}

GetEventById(Id:number):Observable<any>
{
  return this.http.get(`${environment.URL}Events/GetById` + '?Id=' + Id);
}

AddEvent(Event:Events):Observable<any>
{
  return this.http.post(`${environment.URL}Events/AddEvent`,Event,{responseType: 'text'});
}
UpdateEvent(Event:Events,Id:number)
{
  return this.http.put(`${environment.URL}Events/UpdateEvent` + '?Id=' + Id,Event,{responseType:'text'});
}
DeleteEventById(Id:number)
{
  return this.http.delete(`${environment.URL}Events/DeleteEvent` + '?Id=' + Id,{responseType:'text'});
}


}
