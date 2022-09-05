import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryQtyPageComponent } from './inventory-qty-page.component';

describe('InventoryQtyPageComponent', () => {
  let component: InventoryQtyPageComponent;
  let fixture: ComponentFixture<InventoryQtyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryQtyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryQtyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
