import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationButtonComponent } from './automation-button.component';

describe('AutomationButtonComponent', () => {
  let component: AutomationButtonComponent;
  let fixture: ComponentFixture<AutomationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
