import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserAddComponent } from './adviser-add.component';

describe('AdviserAddComponent', () => {
  let component: AdviserAddComponent;
  let fixture: ComponentFixture<AdviserAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviserAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
