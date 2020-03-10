import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeProComponent } from './gauge-pro.component';

describe('GaugeProComponent', () => {
  let component: GaugeProComponent;
  let fixture: ComponentFixture<GaugeProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaugeProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
