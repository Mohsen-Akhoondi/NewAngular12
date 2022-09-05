import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOverPopupComponent } from './shared-over-popup.component';

describe('SharedOverPopupComponent', () => {
  let component: SharedOverPopupComponent;
  let fixture: ComponentFixture<SharedOverPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedOverPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedOverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
