import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEvaluateListComponent } from './request-evaluate-list.component';

describe('RequestEvaluateListComponent', () => {
  let component: RequestEvaluateListComponent;
  let fixture: ComponentFixture<RequestEvaluateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestEvaluateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestEvaluateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
