import {NgModule} from '@angular/core';

import {PagesRoutingModule} from './pages-routing.module';
import {AlertComponent} from './Alert/alert.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {DevicesComponent} from './devices/devices.component';
import {EntitlementsModule} from './entitlements/entitlements.module';
import {RolesModule} from './roles/roles.module';
import {SharedModule} from '../shared/shared.module';
import {ComponentsModule} from '../components/compoments.module';
import {PhoneGuideComponent} from './phone-guide/phone-guide.component';
import {MatPaginatorModule} from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    ComponentsModule,
    PagesRoutingModule,
    EntitlementsModule,
    RolesModule,
    MatPaginatorModule,
  ],
  declarations: [
    AlertComponent,
    DashboardComponent,
    RegisterComponent,
    DevicesComponent,
    PhoneGuideComponent,
  ],
})
export class PagesModule { }
