/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorServicesService } from './authorServices.service';

describe('Service: AuthorServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorServicesService]
    });
  });

  it('should ...', inject([AuthorServicesService], (service: AuthorServicesService) => {
    expect(service).toBeTruthy();
  }));
});
