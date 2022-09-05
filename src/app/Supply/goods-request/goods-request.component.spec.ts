import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsRequestComponent } from './goods-request.component';

describe('GoodsComponent', () => {
  let component: GoodsRequestComponent;
  let fixture: ComponentFixture<GoodsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
