/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookServicesService } from './bookServices.service';

describe('Service: BookServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookServicesService]
    });
  });

  it('should ...', inject([BookServicesService], (service: BookServicesService) => {
    expect(service).toBeTruthy();
  }));
});
