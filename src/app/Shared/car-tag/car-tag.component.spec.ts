import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTagComponent } from './car-tag.component';

describe('CarTagComponent', () => {
  let component: CarTagComponent;
  let fixture: ComponentFixture<CarTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
