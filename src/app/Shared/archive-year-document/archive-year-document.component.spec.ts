import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchiveYearDocumentComponent } from './archive-year-document.component';

describe('ArchiveYearDocumentComponent', () => {
  let component: ArchiveYearDocumentComponent;
  let fixture: ComponentFixture<ArchiveYearDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveYearDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveYearDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
