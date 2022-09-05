import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileViwerPageComponent } from './file-viwer-page.component';

describe('FileViwerPageComponent', () => {
  let component: FileViwerPageComponent;
  let fixture: ComponentFixture<FileViwerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileViwerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileViwerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
