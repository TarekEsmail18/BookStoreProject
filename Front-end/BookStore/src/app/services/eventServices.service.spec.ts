/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventServicesService } from './EventServices.service';

describe('Service: EventServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventServicesService]
    });
  });

  it('should ...', inject([EventServicesService], (service: EventServicesService) => {
    expect(service).toBeTruthy();
  }));
});
