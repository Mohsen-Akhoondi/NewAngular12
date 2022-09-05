import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderPageComponent } from './tender-page.component';

describe('TenderPageComponent', () => {
  let component: TenderPageComponent;
  let fixture: ComponentFixture<TenderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
