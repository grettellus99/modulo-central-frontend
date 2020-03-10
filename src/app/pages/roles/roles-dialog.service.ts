import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Rol} from '../../shared/models/rol';
import {RolesDeleteDialogComponent} from './roles-delete-dialog/roles-delete-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class RolesDialogService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openRemoveDialog(rol: Rol) {
    return this.dialog.open(RolesDeleteDialogComponent, {
      data: {
        rol: rol.name,
      },
    });
  }
}
