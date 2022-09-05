import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyItemComponent } from './warranty-item.component';

describe('WarrantyItemComponent', () => {
  let component: WarrantyItemComponent;
  let fixture: ComponentFixture<WarrantyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
