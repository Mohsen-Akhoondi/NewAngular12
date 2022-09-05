import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderEncryptedFilesListComponent } from './tender-encrypted-files-list.component';

describe('TenderEncryptedFilesListComponent', () => {
  let component: TenderEncryptedFilesListComponent;
  let fixture: ComponentFixture<TenderEncryptedFilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderEncryptedFilesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderEncryptedFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
