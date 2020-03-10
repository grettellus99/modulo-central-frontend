import {NgModule} from '@angular/core';
import {RolesListComponent} from './roles-list/roles-list.component';
import {SharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../components/compoments.module';
import { RolesFormComponent } from './roles-form/roles-form.component';
import {RouterModule} from '@angular/router';
import { RolesDeleteDialogComponent } from './roles-delete-dialog/roles-delete-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule,
  ],
  declarations: [
    RolesListComponent,
    RolesFormComponent,
    RolesDeleteDialogComponent,
  ],
})
export class RolesModule { }
