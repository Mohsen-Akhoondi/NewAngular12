import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRequestPageComponent } from './text-request-page.component';

describe('TextRequestPageComponent', () => {
  let component: TextRequestPageComponent;
  let fixture: ComponentFixture<TextRequestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextRequestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
