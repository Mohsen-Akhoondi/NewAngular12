import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilProjectPageComponent } from './civil-project-page.component';

describe('CivilProjectPageComponent', () => {
  let component: CivilProjectPageComponent;
  let fixture: ComponentFixture<CivilProjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CivilProjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
