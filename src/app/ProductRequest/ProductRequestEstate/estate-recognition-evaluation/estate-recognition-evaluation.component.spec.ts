import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateRecognitionEvaluationComponent } from './estate-recognition-evaluation.component';

describe('EstateRecognitionEvaluationComponent', () => {
  let component: EstateRecognitionEvaluationComponent;
  let fixture: ComponentFixture<EstateRecognitionEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateRecognitionEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateRecognitionEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
