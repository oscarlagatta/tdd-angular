import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.less']
})
export class BookComponent implements OnInit {
  checkIn;
  checkOut;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dataService: DataService) { }

  ngOnInit() {
    // console.log(this.data);
  }

  calculateTotal(checkIn, checkOut) {

    // console.log(checkIn, checkOut);

    // find the difference between the dates
    const checkInDate  = moment(checkIn, 'DD/MM/YY');
    const checkOutDate = moment(checkOut, 'DD/MM/YY');
    // checkOutDate.diff(checkInDate, 'days');
    const nights = checkOutDate.diff(checkInDate, 'days');
    // console.log('price', nights * this.data.home.price );

    // which bgives the number of nights
    // multiply the number by the price
    return nights * this.data.home.price;

  }

  bookHome() {
    this.dataService.bookHome$().subscribe();
  }

}
