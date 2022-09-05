import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListAnalayseComponent } from './price-list-analayse.component';

describe('PriceListAnalayseComponent', () => {
  let component: PriceListAnalayseComponent;
  let fixture: ComponentFixture<PriceListAnalayseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListAnalayseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListAnalayseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
