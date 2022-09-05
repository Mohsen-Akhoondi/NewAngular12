import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitionProceedVariableComponent } from './commition-proceed-variable.component';

describe('CommitionProceedVariableComponent', () => {
  let component: CommitionProceedVariableComponent;
  let fixture: ComponentFixture<CommitionProceedVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitionProceedVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitionProceedVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
