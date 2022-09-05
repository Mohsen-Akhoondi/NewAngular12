import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantSelectTypeComponent } from './consultant-select-type.component';

describe('ConsultantSelectTypeComponent', () => {
  let component: ConsultantSelectTypeComponent;
  let fixture: ComponentFixture<ConsultantSelectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantSelectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantSelectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
