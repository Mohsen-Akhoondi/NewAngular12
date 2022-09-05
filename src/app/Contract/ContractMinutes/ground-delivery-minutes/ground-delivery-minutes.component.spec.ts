import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundDeliveryMinutesComponent } from './ground-delivery-minutes.component';

describe('GroundDeliveryMinutesComponent', () => {
  let component: GroundDeliveryMinutesComponent;
  let fixture: ComponentFixture<GroundDeliveryMinutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundDeliveryMinutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundDeliveryMinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
