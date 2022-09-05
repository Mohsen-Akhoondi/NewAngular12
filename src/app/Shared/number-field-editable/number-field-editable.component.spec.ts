import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberFieldEditableComponent } from './number-field-editable.component';

describe('NumberFieldEditableComponent', () => {
  let component: NumberFieldEditableComponent;
  let fixture: ComponentFixture<NumberFieldEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberFieldEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberFieldEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
