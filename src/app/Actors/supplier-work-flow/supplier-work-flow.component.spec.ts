import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierWorkFlowComponent } from './supplier-work-flow.component';

describe('SupplierWorkFlowComponent', () => {
  let component: SupplierWorkFlowComponent;
  let fixture: ComponentFixture<SupplierWorkFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierWorkFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
