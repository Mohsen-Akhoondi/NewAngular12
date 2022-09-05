import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceVolumeGreenSpaceComponent } from './maintenance-volume-green-space.component';

describe('MaintenanceVolumeGreenSpaceComponent', () => {
  let component: MaintenanceVolumeGreenSpaceComponent;
  let fixture: ComponentFixture<MaintenanceVolumeGreenSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceVolumeGreenSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceVolumeGreenSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
