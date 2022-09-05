import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPersonPageComponent } from './contract-person-page.component';

describe('ContractPersonPageComponent', () => {
  let component: ContractPersonPageComponent;
  let fixture: ComponentFixture<ContractPersonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPersonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
