import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InuirySearchListComponent } from './inuiry-search-list.component';

describe('InuirySearchListComponent', () => {
  let component: InuirySearchListComponent;
  let fixture: ComponentFixture<InuirySearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InuirySearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InuirySearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
