import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankParameterComponent } from './rank-parameter.component';

describe('RankParameterComponent', () => {
  let component: RankParameterComponent;
  let fixture: ComponentFixture<RankParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
