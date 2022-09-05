import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPaperPageComponent } from './news-paper-page.component';

describe('NewsPaperPageComponent', () => {
  let component: NewsPaperPageComponent;
  let fixture: ComponentFixture<NewsPaperPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsPaperPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPaperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
