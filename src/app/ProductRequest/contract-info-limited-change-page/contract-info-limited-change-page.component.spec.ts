import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInfoLimitedChangePageComponent } from './contract-info-limited-change-page.component';

describe('ContractInfoLimitedChangePageComponent', () => {
  let component: ContractInfoLimitedChangePageComponent;
  let fixture: ComponentFixture<ContractInfoLimitedChangePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractInfoLimitedChangePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInfoLimitedChangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
