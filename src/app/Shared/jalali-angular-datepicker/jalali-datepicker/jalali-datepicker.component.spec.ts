import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JalaliDatepickerComponent } from './jalali-datepicker.component';

describe('JalaliDatepickerComponent', () => {
  let component: JalaliDatepickerComponent;
  let fixture: ComponentFixture<JalaliDatepickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JalaliDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JalaliDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
