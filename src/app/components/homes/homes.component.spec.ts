import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOnClass } from 'jasmine-es6-spies';

import { HomesComponent } from './homes.component';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';

describe('HomesComponent', () => {
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let dataService: jasmine.SpyObj<DataService>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      providers:[
        {
          provide: DataService,
          useFactory: () => spyOnClass(DataService)
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
    dataService = TestBed.get(DataService);

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

});
