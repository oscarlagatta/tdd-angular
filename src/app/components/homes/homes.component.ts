import { Component, OnInit } from "@angular/core";
import { of } from "rxjs";
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BookComponent } from '../book/book.component';

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


  }

  openDialog(home: string) {
    this.dialogService.open(BookComponent, {
      width: '250px',
      data: { home }
    });
  }
}
