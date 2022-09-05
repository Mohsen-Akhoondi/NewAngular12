import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetPageSearchComponent } from './asset-page-search.component';

describe('AssetPageSearchComponent', () => {
  let component: AssetPageSearchComponent;
  let fixture: ComponentFixture<AssetPageSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetPageSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetPageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
