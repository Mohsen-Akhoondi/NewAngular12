import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyContractListComponent } from './proxy-contract-list.component';

describe('ProxyContractListComponent', () => {
  let component: ProxyContractListComponent;
  let fixture: ComponentFixture<ProxyContractListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProxyContractListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
