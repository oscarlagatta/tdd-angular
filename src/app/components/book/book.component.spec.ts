import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BookComponent } from "./book.component";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

describe("BookComponent", () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let dialogData;

  const element = function(selector) {
    return fixture.nativeElement.querySelector(selector);
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    dialogData = TestBed.get(MAT_DIALOG_DATA);
    component = fixture.componentInstance;

    const homes = require("../../../assets/homes.json");
    dialogData.home = homes[0];
    fixture.detectChanges();
  });

  it("should show title", () => {
    expect(component).toBeTruthy();
    expect(element('[data-test="title"]').textContent).toContain("Home 1");
  });

  it("should show price", () => {

    expect(element('[data-test="price"]').textContent).toContain("125");
  });

  // should show check in date field

  it("should show check in date field", () => {
    expect(element('[data-test="check-in"]'))
      .toBeTruthy();
  });
  // should show check out date field
  it("should show check out date field", () => {
    expect(element('[data-test="check-out"]'))
      .toBeTruthy();
  });
  // should show total
  // should book home after clicking the Book button
});
