import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";

@Component({
  selector: "app-homes",
  templateUrl: "./homes.component.html",
  styleUrls: ["./homes.component.less"]
})
export class HomesComponent implements OnInit {
  homes$;

  constructor() {}

  ngOnInit() {
    // this.homes$ = this.dataService.getHomes();

    this.homes$ = of([
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
    ]);
  }
}
