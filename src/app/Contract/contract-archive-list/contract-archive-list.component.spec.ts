import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractArchiveListComponent } from './contract-archive-list.component';

describe('ContractArchiveListComponent', () => {
  let component: ContractArchiveListComponent;
  let fixture: ComponentFixture<ContractArchiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractArchiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractArchiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
