import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorCardListComponent } from './contractor-card-list.component';

describe('ContractorCardListComponent', () => {
  let component: ContractorCardListComponent;
  let fixture: ComponentFixture<ContractorCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
