import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersSearchPageComponent } from './providers-search-page.component';

describe('ProvidersSearchPageComponent', () => {
  let component: ProvidersSearchPageComponent;
  let fixture: ComponentFixture<ProvidersSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersSearchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
