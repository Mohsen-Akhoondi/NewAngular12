import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilityTypePageComponent } from './responsibility-type-page.component';

describe('ResponsibilityTypePageComponent', () => {
  let component: ResponsibilityTypePageComponent;
  let fixture: ComponentFixture<ResponsibilityTypePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibilityTypePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibilityTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
