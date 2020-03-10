import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Entitlement} from '../../shared/models/entitlement';
import {EntitlementDeleteDialogComponent} from './entitlement-delete-dialog/entitlement-delete-dialog.component';
// import {PermisosDialogComponent} from './permisos-dialog/permisos-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class EntitlementsDialogService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  openRemoveDialog(entitlement: Entitlement) {
    return this.dialog.open(EntitlementDeleteDialogComponent, {
      data: {
        entitlement: entitlement.name,
      },
    });
  }
}
