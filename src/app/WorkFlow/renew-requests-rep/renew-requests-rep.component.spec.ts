import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewRequestsRepComponent } from './renew-requests-rep.component';

describe('RenewRequestsRepComponent', () => {
  let component: RenewRequestsRepComponent;
  let fixture: ComponentFixture<RenewRequestsRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewRequestsRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewRequestsRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
