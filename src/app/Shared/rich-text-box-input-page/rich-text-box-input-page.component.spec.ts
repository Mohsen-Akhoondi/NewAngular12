import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextBoxInputPageComponent } from './rich-text-box-input-page.component';

describe('RichTextBoxInputPageComponent', () => {
  let component: RichTextBoxInputPageComponent;
  let fixture: ComponentFixture<RichTextBoxInputPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichTextBoxInputPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichTextBoxInputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
