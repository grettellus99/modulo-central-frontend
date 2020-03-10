import {NgModule} from '@angular/core';
import {EntitlementComponent} from './entitlement-list/entitlement.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../components/compoments.module';
import { EntitlementFormComponent } from './entitlement-form/entitlement-form.component';
import { EntitlementDeleteDialogComponent } from './entitlement-delete-dialog/entitlement-delete-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule,
  ],
  declarations: [
    EntitlementComponent,
    EntitlementFormComponent,
    EntitlementDeleteDialogComponent,
  ],
  entryComponents: [
    EntitlementDeleteDialogComponent,
  ],
})
export class EntitlementsModule {}
