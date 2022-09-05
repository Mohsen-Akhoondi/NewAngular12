import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractProvisionRemainPageComponent } from './contract-provision-remain-page.component';

describe('ContractProvisionRemainPageComponent', () => {
  let component: ContractProvisionRemainPageComponent;
  let fixture: ComponentFixture<ContractProvisionRemainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractProvisionRemainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractProvisionRemainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
