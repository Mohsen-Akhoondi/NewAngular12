import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowContractRelationComponent } from './show-contract-relation.component';

describe('ShowContractRelationComponent', () => {
  let component: ShowContractRelationComponent;
  let fixture: ComponentFixture<ShowContractRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowContractRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowContractRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
