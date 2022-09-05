import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedTreeComponent } from './customized-tree.component';

describe('CustomizedTreeComponent', () => {
  let component: CustomizedTreeComponent;
  let fixture: ComponentFixture<CustomizedTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizedTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
