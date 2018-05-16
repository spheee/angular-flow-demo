import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorHoldonComponent } from './editor-holdon.component';

describe('EditorHoldonComponent', () => {
  let component: EditorHoldonComponent;
  let fixture: ComponentFixture<EditorHoldonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorHoldonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorHoldonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
