import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: "app-homes",
  templateUrl: "./homes.component.html",
  styleUrls: ["./homes.component.less"]
})
export class HomesComponent implements OnInit {
  homes$;

  constructor(private dataService: DataService,
              private dialogService: DialogService) {}

  ngOnInit() {

    this.homes$ = this.dataService.getHomes$();

    // this.homes$ = of([
    //   {
    //     title: "home 1",
    //     imageUrl: "assets/listing.jpg",
    //     location: "new york"
    //   },
    //   {
    //     title: "home 2",
    //     imageUrl: "assets/listing.jpg",
    //     location: "boston"
    //   },
    //   {
    //     title: "home 3",
    //     imageUrl: "assets/listing.jpg",
    //     location: "london"
    //   }
    // ]);
  }

  openDialog() {
    this.dialogService.open();
  }
}
