import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectActorForSmsComponent } from './select-actor-for-sms.component';

describe('SelectActorForSmsComponent', () => {
  let component: SelectActorForSmsComponent;
  let fixture: ComponentFixture<SelectActorForSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectActorForSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectActorForSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
