import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractingCardSearchComponent } from './contracting-card-search.component';

describe('ContractingCardSearchComponent', () => {
  let component: ContractingCardSearchComponent;
  let fixture: ComponentFixture<ContractingCardSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractingCardSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractingCardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
