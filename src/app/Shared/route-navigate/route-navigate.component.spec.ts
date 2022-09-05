import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNavigateComponent } from './route-navigate.component';

describe('RouteNavigateComponent', () => {
  let component: RouteNavigateComponent;
  let fixture: ComponentFixture<RouteNavigateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteNavigateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
