import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestUsageTypeComponent } from './invest-usage-type.component';

describe('InvestUsageTypeComponent', () => {
  let component: InvestUsageTypeComponent;
  let fixture: ComponentFixture<InvestUsageTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestUsageTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestUsageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
