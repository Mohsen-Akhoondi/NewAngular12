import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitionComponent } from './commition.component';

describe('CommitionComponent', () => {
  let component: CommitionComponent;
  let fixture: ComponentFixture<CommitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
