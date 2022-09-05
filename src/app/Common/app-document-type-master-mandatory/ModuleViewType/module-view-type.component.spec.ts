import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewTypeComponent } from './module-view-type.component';

describe('ModuleViewTypeComponent', () => {
  let component: ModuleViewTypeComponent;
  let fixture: ComponentFixture<ModuleViewTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleViewTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleViewTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
