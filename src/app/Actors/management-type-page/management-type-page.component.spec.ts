import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementTypePageComponent } from './management-type-page.component';

describe('ManagementTypePageComponent', () => {
  let component: ManagementTypePageComponent;
  let fixture: ComponentFixture<ManagementTypePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementTypePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
