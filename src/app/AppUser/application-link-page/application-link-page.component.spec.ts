import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLinkPageComponent } from './application-link-page.component';

describe('ApplicationLinkPageComponent', () => {
  let component: ApplicationLinkPageComponent;
  let fixture: ComponentFixture<ApplicationLinkPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationLinkPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationLinkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
