import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementTreeComponent } from './entitlement-tree.component';

describe('EntitlementTreeComponent', () => {
  let component: EntitlementTreeComponent;
  let fixture: ComponentFixture<EntitlementTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitlementTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitlementTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
