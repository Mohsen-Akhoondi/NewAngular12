import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearcherProductRequestListComponent } from './researcher-product-request-list.component';

describe('ResearcherProductRequestListComponent', () => {
  let component: ResearcherProductRequestListComponent;
  let fixture: ComponentFixture<ResearcherProductRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearcherProductRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearcherProductRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
