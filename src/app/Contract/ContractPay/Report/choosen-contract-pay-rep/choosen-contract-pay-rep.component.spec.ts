import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosenContractPayRepComponent } from './choosen-contract-pay-rep.component';

describe('ChoosenContractPayRepComponent', () => {
  let component: ChoosenContractPayRepComponent;
  let fixture: ComponentFixture<ChoosenContractPayRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosenContractPayRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosenContractPayRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
