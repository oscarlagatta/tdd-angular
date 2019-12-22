import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BookComponent } from "./book.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from 'rxjs/internal/observable/of';

describe("BookComponent", () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData;
  let dataService: jasmine.SpyObj<DataService>;

  const element = function(selector) {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BookComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DataService, useFactory: () => spyOnClass(DataService)},

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);

    const homes = require("../../../assets/homes.json");
    dialogData.home = homes[0];
    fixture.detectChanges();
  });

  it("should show title", () => {
    expect(component).toBeTruthy();
    expect(element('[data-test="title"]').textContent).toContain("Book Home 1");
  });

  it("should show price", () => {

    expect(element('[data-test="price"]').textContent).toContain("£125 per night");
  });

  it("should show check in date field", () => {
    expect(element('[data-test="check-in"]'))
      .toBeTruthy();
  });

  it("should show check out date field", () => {
    expect(element('[data-test="check-out"]'))
      .toBeTruthy();
  });

  it("should show total", () => {

    // user enters checkin date:
    const checkIn = element('[data-test="check-in"] input');
    checkIn.value = '20/12/2019';
    checkIn.dispatchEvent(new Event('input'));

    // user enters check out date
    const checkOut = element('[data-test="check-out"] input');
    checkOut.value = '23/12/2019';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // assert the totals shows 3 x 125 = 375

    expect(element('[data-test="total"]').textContent)
      .toContain('Total: £375');

  });

  // should book home after clicking the Book button
  it("should book home after clicking the Book button", () => {

    dataService.bookHome$.and.returnValue(of(null));
    // user enters checkin date:
    const checkIn = element('[data-test="check-in"] input');
    checkIn.value = '20/12/2019';
    checkIn.dispatchEvent(new Event('input'));

    // user enters check out date
    const checkOut = element('[data-test="check-out"] input');
    checkOut.value = '23/12/2019';
    checkOut.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    // click on the book button
    element('[data-test="book-btn"] button').click();

    // assert the dataService was used to book the home
    expect(dataService.bookHome$).toHaveBeenCalled();

  });

});
