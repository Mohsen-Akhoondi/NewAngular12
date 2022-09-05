import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfmOverPopupComponent } from './cfm-over-popup.component';

describe('CfmOverPopupComponent', () => {
  let component: CfmOverPopupComponent;
  let fixture: ComponentFixture<CfmOverPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfmOverPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfmOverPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
