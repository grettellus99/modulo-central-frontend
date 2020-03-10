import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitlementDeleteDialogComponent } from './entitlement-delete-dialog.component';

describe('EntitlementDeleteDialogComponent', () => {
  let component: EntitlementDeleteDialogComponent;
  let fixture: ComponentFixture<EntitlementDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntitlementDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitlementDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
