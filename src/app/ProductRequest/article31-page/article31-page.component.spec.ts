import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Article31PageComponent } from './article31-page.component';

describe('Article31PageComponent', () => {
  let component: Article31PageComponent;
  let fixture: ComponentFixture<Article31PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Article31PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Article31PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
