import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealMethodComponent } from './deal-method.component';

describe('DealMethodComponent', () => {
  let component: DealMethodComponent;
  let fixture: ComponentFixture<DealMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
