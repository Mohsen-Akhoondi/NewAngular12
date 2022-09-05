import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndOfContractComponent } from './end-of-contract.component';

describe('EndOfContractComponent', () => {
  let component: EndOfContractComponent;
  let fixture: ComponentFixture<EndOfContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndOfContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndOfContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
