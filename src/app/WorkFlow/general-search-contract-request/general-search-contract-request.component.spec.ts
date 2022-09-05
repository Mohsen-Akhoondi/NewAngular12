import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSearchContractRequestComponent } from './general-search-contract-request.component';

describe('GeneralSearchContractRequestComponent', () => {
  let component: GeneralSearchContractRequestComponent;
  let fixture: ComponentFixture<GeneralSearchContractRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSearchContractRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSearchContractRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
