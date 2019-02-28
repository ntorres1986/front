import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumesComponent } from './consumes.component';

describe('ConsumesComponent', () => {
  let component: ConsumesComponent;
  let fixture: ComponentFixture<ConsumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
