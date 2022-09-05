import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTreeComponent } from './tree.component';

describe('TreeComponent', () => {
  let component: MyTreeComponent;
  let fixture: ComponentFixture<MyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
