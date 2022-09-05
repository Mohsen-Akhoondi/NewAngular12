import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputComponentComponent } from './number-input-component.component';

describe('NumberInputComponentComponent', () => {
  let component: NumberInputComponentComponent;
  let fixture: ComponentFixture<NumberInputComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberInputComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberInputComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
