import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferDistanceItemComponent } from './transfer-distance-item.component';

describe('TransferDistanceItemComponent', () => {
  let component: TransferDistanceItemComponent;
  let fixture: ComponentFixture<TransferDistanceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferDistanceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDistanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
