import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListTopicDataentryPageComponent } from './price-list-topic-dataentry-page.component';

describe('PriceListTopicDataentryPageComponent', () => {
  let component: PriceListTopicDataentryPageComponent;
  let fixture: ComponentFixture<PriceListTopicDataentryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListTopicDataentryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListTopicDataentryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
