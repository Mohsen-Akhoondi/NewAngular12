import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterPageRepComponent } from './cost-center-page-rep.component';

describe('CostCenterPageRepComponent', () => {
  let component: CostCenterPageRepComponent;
  let fixture: ComponentFixture<CostCenterPageRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostCenterPageRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostCenterPageRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
