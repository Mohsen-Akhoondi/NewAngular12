import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApprPriceIndexComponent } from './modal-appr-price-index.component';

describe('ModalApprPriceIndexComponent', () => {
  let component: ModalApprPriceIndexComponent;
  let fixture: ComponentFixture<ModalApprPriceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalApprPriceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalApprPriceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
