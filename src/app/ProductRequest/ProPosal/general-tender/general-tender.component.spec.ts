import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTenderComponent } from './general-tender.component';

describe('GeneralTenderComponent', () => {
  let component: GeneralTenderComponent;
  let fixture: ComponentFixture<GeneralTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
