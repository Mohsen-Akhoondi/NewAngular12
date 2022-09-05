import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractPayDetailsComponent } from './contract-pay-details.component';

describe('ContractPayComponent', () => {
  let component: ContractPayDetailsComponent;
  let fixture: ComponentFixture<ContractPayDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPayDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
