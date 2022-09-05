import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableTypeComponent } from './variable-type.component';

describe('VariableTypeComponent', () => {
  let component: VariableTypeComponent;
  let fixture: ComponentFixture<VariableTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
