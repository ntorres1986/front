import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeEditComponent } from './consume-edit.component';

describe('ConsumeEditComponent', () => {
  let component: ConsumeEditComponent;
  let fixture: ComponentFixture<ConsumeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
