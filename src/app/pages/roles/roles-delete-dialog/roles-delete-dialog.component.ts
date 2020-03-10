import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-roles-delete-dialog',
  templateUrl: './roles-delete-dialog.component.html',
  styleUrls: ['./roles-delete-dialog.component.scss'],
})
export class RolesDeleteDialogComponent {
  rol: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.rol = this.data.rol;
  }
}
