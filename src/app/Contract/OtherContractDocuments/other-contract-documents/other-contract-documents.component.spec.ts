import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherContractDocumentsComponent } from './other-contract-documents.component';

describe('OtherContractDocumentsComponent', () => {
  let component: OtherContractDocumentsComponent;
  let fixture: ComponentFixture<OtherContractDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherContractDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherContractDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
