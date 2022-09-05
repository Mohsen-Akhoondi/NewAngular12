import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StimulViewerComponent } from './stimul-viewer.component';

describe('StimulViewerComponent', () => {
  let component: StimulViewerComponent;
  let fixture: ComponentFixture<StimulViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StimulViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StimulViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
