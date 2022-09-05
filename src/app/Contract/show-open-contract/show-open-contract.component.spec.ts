import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOpenContractComponent } from './show-open-contract.component';

describe('ShowOpenContractComponent', () => {
  let component: ShowOpenContractComponent;
  let fixture: ComponentFixture<ShowOpenContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOpenContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOpenContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
