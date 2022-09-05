import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealUploadDocsComponent } from './deal-upload-docs.component';

describe('DealUploadDocsComponent', () => {
  let component: DealUploadDocsComponent;
  let fixture: ComponentFixture<DealUploadDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealUploadDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealUploadDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
