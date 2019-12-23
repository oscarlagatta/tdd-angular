import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOnClass } from 'jasmine-es6-spies';

import { HomesComponent } from './homes.component';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      providers:[
        {
          provide: DataService,
          useFactory: () => spyOnClass(DataService)
        },{
          provide: DialogService,
          useFactory: () => spyOnClass(DialogService)
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomesComponent);
    component = fixture.componentInstance;
  });


  beforeEach( ()=> {
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;

    dataService.getHomes$.and.returnValue(of([
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
    ]));

    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;

    fixture.detectChanges();
  });

  it('should show homes', () => {
    expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);
  });

  it('should show home info', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="title"]').innerText).toEqual('home 1');
    expect(home.querySelector('[data-test="location"]').innerText).toEqual('new york');
    expect(home.querySelector('[data-test="image"]')).toBeTruthy();
  });

  it('should show book button', () => {
    const home = fixture.nativeElement.querySelector('[data-test="home"]');

    expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
  });

  it('should use dialog service to open a dialog when clicking on Book button', () => {

    // grab the button to click
    const bookBtn = fixture.nativeElement.querySelector('[data-test="home"] button');

    // click the button
    bookBtn.click();

    // assert that the dialog service was used to open a dialog
    expect(dialogService.open).toHaveBeenCalled();

    // expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
  });



});
