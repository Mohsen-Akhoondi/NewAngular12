import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCapacityComponent } from './corporate-capacity.component';

describe('CorporateCapacityComponent', () => {
  let component: CorporateCapacityComponent;
  let fixture: ComponentFixture<CorporateCapacityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCapacityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
