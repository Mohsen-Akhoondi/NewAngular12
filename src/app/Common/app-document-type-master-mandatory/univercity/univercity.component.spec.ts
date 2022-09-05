import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnivercityComponent } from './univercity.component';

describe('UnivercityComponent', () => {
  let component: UnivercityComponent;
  let fixture: ComponentFixture<UnivercityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnivercityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnivercityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
