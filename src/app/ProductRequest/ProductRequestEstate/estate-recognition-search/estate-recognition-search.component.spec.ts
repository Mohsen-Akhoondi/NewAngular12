import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateRecognitionSearchComponent } from './estate-recognition-search.component';

describe('EstateRecognitionSearchComponent', () => {
  let component: EstateRecognitionSearchComponent;
  let fixture: ComponentFixture<EstateRecognitionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateRecognitionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateRecognitionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
