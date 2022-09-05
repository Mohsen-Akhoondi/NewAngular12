import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBookComponent } from './daily-book.component';

describe('DailyBookComponent', () => {
  let component: DailyBookComponent;
  let fixture: ComponentFixture<DailyBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
