import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAssetTypeComponent } from './provider-asset-type.component';

describe('ProviderAssetTypeComponent', () => {
  let component: ProviderAssetTypeComponent;
  let fixture: ComponentFixture<ProviderAssetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderAssetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAssetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
