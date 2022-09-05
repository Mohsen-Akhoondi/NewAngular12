import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLedgerAccBookComponent } from './sub-ledger-acc-book.component';

describe('SubLedgerAccBookComponent', () => {
  let component: SubLedgerAccBookComponent;
  let fixture: ComponentFixture<SubLedgerAccBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubLedgerAccBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubLedgerAccBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
