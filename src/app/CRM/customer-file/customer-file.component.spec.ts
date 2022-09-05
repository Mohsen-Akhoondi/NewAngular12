import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFileComponent } from './customer-file.component';

describe('CustomerFileComponent', () => {
  let component: CustomerFileComponent;
  let fixture: ComponentFixture<CustomerFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
