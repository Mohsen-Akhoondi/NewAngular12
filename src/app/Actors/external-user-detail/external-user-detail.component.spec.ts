import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalUserDetailComponent } from './external-user-detail.component';

describe('ExternalUserDetailComponent', () => {
  let component: ExternalUserDetailComponent;
  let fixture: ComponentFixture<ExternalUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
