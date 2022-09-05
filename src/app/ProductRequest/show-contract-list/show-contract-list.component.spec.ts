import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContractListComponent } from './show-contract-list.component';

describe('ShowContractListComponent', () => {
  let component: ShowContractListComponent;
  let fixture: ComponentFixture<ShowContractListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContractListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
