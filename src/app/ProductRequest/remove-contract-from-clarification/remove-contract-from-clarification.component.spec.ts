import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveContractFromClarificationComponent } from './remove-contract-from-clarification.component';

describe('RemoveContractFromClarificationComponent', () => {
  let component: RemoveContractFromClarificationComponent;
  let fixture: ComponentFixture<RemoveContractFromClarificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveContractFromClarificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveContractFromClarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
