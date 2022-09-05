import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCertificateComponent } from './actor-certificate.component';

describe('ActorCertificateComponent', () => {
  let component: ActorCertificateComponent;
  let fixture: ComponentFixture<ActorCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActorCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
