import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserEditComponent } from './adviser-edit.component';

describe('AdviserEditComponent', () => {
  let component: AdviserEditComponent;
  let fixture: ComponentFixture<AdviserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
