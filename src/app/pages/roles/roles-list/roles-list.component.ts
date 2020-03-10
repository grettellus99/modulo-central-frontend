import {Component, OnInit} from '@angular/core';

import {Rol} from '../../../shared/models/rol';
import {EntityDataSource} from '../../../shared/utils/entity-data-source';
import {RolesService} from '../../../shared/services/roles.service';
import {RolesDialogService} from '../roles-dialog.service';

const mockData: Rol[] = [
  {
    id: 'rol-1',
    name: 'ROLE_USER',
    active: true,
  },
  {
    id: 'rol-2',
    name: 'ROLE_ADMIN',
    active: true,
  },
  {
    id: 'rol-3',
    name: 'ROLE_OTHER',
    active: false,
  },
];

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent implements OnInit {
  dataSource: EntityDataSource<Rol>;
  displayedColumns = ['name', 'active', 'actions'];
  constructor(
    private rolesService: RolesService,
    private dialogService: RolesDialogService,
  ) {
    this.dataSource = new EntityDataSource<Rol>(mockData);
  }

  ngOnInit() {
    // this.dataSource = new EntityDataSource(undefined);
    // this.rolesService.findAll()
    //   .subscribe(roles => {
    //     this.dataSource = new EntityDataSource(roles);
    //   });
  }

  remove(rol: Rol) {
    this.dialogService.openRemoveDialog(rol)
      .afterClosed()
      .subscribe(shouldRemove => {
        if (shouldRemove) {
          this.rolesService.delete(rol.id)
            .subscribe(deletedRolId => {
              this.dataSource.remove(deletedRolId);
            });
        }
      });
  }

}
