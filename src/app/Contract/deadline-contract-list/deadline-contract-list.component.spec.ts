import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadlineContractListComponent } from './deadline-contract-list.component';

describe('DeadlineContractListComponent', () => {
  let component: DeadlineContractListComponent;
  let fixture: ComponentFixture<DeadlineContractListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadlineContractListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadlineContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
