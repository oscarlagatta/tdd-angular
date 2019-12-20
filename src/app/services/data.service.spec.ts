import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DataService', () => {

  // for referencing the mocked http client
  let httpClient: HttpClient;

  let dataService: DataService;

  beforeEach(() => TestBed.configureTestingModule({
     imports: [HttpClientTestingModule]
  }));

  it('should return the list of homes', () => {

      // Spy on and mock the HttpClient
      httpClient = TestBed.get(HttpClient);
      const homesMock = [
        {
          title: "home 1",
          imageUrl: "assets/listing.jpg",
          location: "new york"
        },
        {
          title: "home 2",
          imageUrl: "assets/listing.jpg",
          location: "boston"
        },
        {
          title: "home 3",
          imageUrl: "assets/listing.jpg",
          location: "london"
        }
      ]

      spyOn(httpClient, 'get').and.returnValue(of(homesMock));

      // User our service to get the list of homes
      dataService = TestBed.get(DataService);
      const spy = jasmine.createSpy('spy');
      dataService.getHomes$().subscribe(spy);

      // Verify the service returned mocked data
      expect(spy).toHaveBeenCalledWith(homesMock);

      // Verify the service called the correct http endpoint.
      expect(httpClient.get).toHaveBeenCalledWith('assets/homes.json');

  });
});
