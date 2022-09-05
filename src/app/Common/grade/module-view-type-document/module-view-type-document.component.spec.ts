import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewTypeDocumentComponent } from './module-view-type-document.component';

describe('ModuleViewTypeDocumentComponent', () => {
  let component: ModuleViewTypeDocumentComponent;
  let fixture: ComponentFixture<ModuleViewTypeDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleViewTypeDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleViewTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
