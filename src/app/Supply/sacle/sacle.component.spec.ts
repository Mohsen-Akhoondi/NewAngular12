import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SacleComponent } from './sacle.component';

describe('SacleComponent', () => {
  let component: SacleComponent;
  let fixture: ComponentFixture<SacleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SacleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
