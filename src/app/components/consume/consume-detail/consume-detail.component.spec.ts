import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeDetailComponent } from './consume-detail.component';

describe('ConsumeDetailComponent', () => {
  let component: ConsumeDetailComponent;
  let fixture: ComponentFixture<ConsumeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
