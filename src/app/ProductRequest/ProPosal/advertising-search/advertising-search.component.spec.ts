import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingSearchComponent } from './advertising-search.component';

describe('AdvertisingSearchComponent', () => {
  let component: AdvertisingSearchComponent;
  let fixture: ComponentFixture<AdvertisingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
