import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioBoxComponentComponent } from './radio-box-component.component';

describe('RadioBoxComponentComponent', () => {
  let component: RadioBoxComponentComponent;
  let fixture: ComponentFixture<RadioBoxComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioBoxComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
