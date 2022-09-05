import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetIncomeComponent } from './asset-income.component';

describe('AssetIncomeComponent', () => {
  let component: AssetIncomeComponent;
  let fixture: ComponentFixture<AssetIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
