import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTypeComponent } from './share-type.component';

describe('ShareTypeComponent', () => {
  let component: ShareTypeComponent;
  let fixture: ComponentFixture<ShareTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
