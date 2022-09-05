import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMainContractorComponent } from './set-main-contractor.component';

describe('SetMainContractorComponent', () => {
  let component: SetMainContractorComponent;
  let fixture: ComponentFixture<SetMainContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetMainContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMainContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
