import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviserDetailComponent } from './adviser-detail.component';

describe('AdviserDetailComponent', () => {
  let component: AdviserDetailComponent;
  let fixture: ComponentFixture<AdviserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdviserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
