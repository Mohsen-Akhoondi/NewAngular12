import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherContractDocsListComponent } from './other-contract-docs-list.component';

describe('OtherContractDocsListComponent', () => {
  let component: OtherContractDocsListComponent;
  let fixture: ComponentFixture<OtherContractDocsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherContractDocsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherContractDocsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
