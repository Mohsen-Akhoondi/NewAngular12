import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovablePropertyPageComponent } from './movable-property-page.component';

describe('MovablePropertyPageComponent', () => {
  let component: MovablePropertyPageComponent;
  let fixture: ComponentFixture<MovablePropertyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovablePropertyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovablePropertyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
