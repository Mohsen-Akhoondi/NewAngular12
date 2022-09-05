import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Corporate2Component } from './corporate2.component';

describe('Corporate2Component', () => {
  let component: Corporate2Component;
  let fixture: ComponentFixture<Corporate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Corporate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Corporate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
