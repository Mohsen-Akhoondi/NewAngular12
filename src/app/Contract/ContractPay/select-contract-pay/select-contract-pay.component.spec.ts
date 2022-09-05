import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContractPayComponent } from './select-contract-pay.component';

describe('SelectContractPayComponent', () => {
  let component: SelectContractPayComponent;
  let fixture: ComponentFixture<SelectContractPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContractPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContractPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
