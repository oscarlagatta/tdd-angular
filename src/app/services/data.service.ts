import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$(){

    // @todo add a real HTTP CALL to get homes
    return this.httpClient.get<any>('assets/homes.json');
  }

  bookHome$() {

    return of(null);
  }
}
