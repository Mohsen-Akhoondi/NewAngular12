import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitionPrintComponent } from './commition-print.component';

describe('CommitionPrintComponent', () => {
  let component: CommitionPrintComponent;
  let fixture: ComponentFixture<CommitionPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitionPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
