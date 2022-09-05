import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitionTypeComponent } from './commition-type.component';

describe('CommitionTypeComponent', () => {
  let component: CommitionTypeComponent;
  let fixture: ComponentFixture<CommitionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
