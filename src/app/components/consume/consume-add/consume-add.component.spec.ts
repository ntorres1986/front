import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeAddComponent } from './consume-add.component';

describe('ConsumeAddComponent', () => {
  let component: ConsumeAddComponent;
  let fixture: ComponentFixture<ConsumeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
