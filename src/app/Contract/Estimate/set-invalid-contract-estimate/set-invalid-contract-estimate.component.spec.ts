import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInvalidContractEstimateComponent } from './set-invalid-contract-estimate.component';

describe('SetInvalidContractEstimateComponent', () => {
  let component: SetInvalidContractEstimateComponent;
  let fixture: ComponentFixture<SetInvalidContractEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetInvalidContractEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetInvalidContractEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
