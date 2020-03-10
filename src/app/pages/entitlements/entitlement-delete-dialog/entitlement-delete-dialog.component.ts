import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-entitlement-delete-dialog',
  templateUrl: './entitlement-delete-dialog.component.html',
  styleUrls: ['./entitlement-delete-dialog.component.scss'],
})
export class EntitlementDeleteDialogComponent {
  entitlement: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.entitlement = this.data.entitlement;
  }
}
