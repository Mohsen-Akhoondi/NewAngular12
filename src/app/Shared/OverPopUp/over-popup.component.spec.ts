import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverPopupComponent } from './over-popup.component';

describe('OverPopupComponent', () => {
  let component: OverPopupComponent;
  let fixture: ComponentFixture<OverPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
