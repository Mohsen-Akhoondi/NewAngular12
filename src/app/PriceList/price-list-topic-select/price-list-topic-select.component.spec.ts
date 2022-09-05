import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListTopicSelectComponent } from './price-list-topic-select.component';

describe('PriceListTopicSelectComponent', () => {
  let component: PriceListTopicSelectComponent;
  let fixture: ComponentFixture<PriceListTopicSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListTopicSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListTopicSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
