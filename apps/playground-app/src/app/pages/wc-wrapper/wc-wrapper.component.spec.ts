import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcWrapperComponent } from './wc-wrapper.component';

describe('WcWrapperComponent', () => {
  let component: WcWrapperComponent;
  let fixture: ComponentFixture<WcWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WcWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WcWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
