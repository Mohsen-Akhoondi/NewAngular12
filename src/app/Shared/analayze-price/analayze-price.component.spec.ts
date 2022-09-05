import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalayzePriceComponent } from './analayze-price.component';

describe('AnalayzePriceComponent', () => {
  let component: AnalayzePriceComponent;
  let fixture: ComponentFixture<AnalayzePriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalayzePriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalayzePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
