import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHistoryDetailComponent } from './show-history-detail.component';

describe('ShowHistoryDetailComponent', () => {
  let component: ShowHistoryDetailComponent;
  let fixture: ComponentFixture<ShowHistoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowHistoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowHistoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
