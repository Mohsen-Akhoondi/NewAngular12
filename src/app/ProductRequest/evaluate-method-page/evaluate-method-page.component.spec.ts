import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateMethodPageComponent } from './evaluate-method-page.component';

describe('EvaluateMethodPageComponent', () => {
  let component: EvaluateMethodPageComponent;
  let fixture: ComponentFixture<EvaluateMethodPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateMethodPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateMethodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
