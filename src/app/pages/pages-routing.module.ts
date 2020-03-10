import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import {DevicesComponent} from './devices/devices.component';
import {EntitlementComponent} from './entitlements/entitlement-list/entitlement.component';
import {EntitlementFormComponent} from './entitlements/entitlement-form/entitlement-form.component';
import {RolesFormComponent} from './roles/roles-form/roles-form.component';
import {RolesListComponent} from './roles/roles-list/roles-list.component';
import {PhoneGuideComponent} from './phone-guide/phone-guide.component';

const routes: Routes = [
  { path: 'home', component: DashboardComponent},
  { path: 'devices', component: DevicesComponent},
  { path: 'phone-guide', component: PhoneGuideComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'admin',
    children: [
      {path: 'users', component: UsuariosComponent},
      {path: 'permisos', component: EntitlementComponent},
      {path: 'permisos/form', component: EntitlementFormComponent},
      {path: 'permisos/form/:id', component: EntitlementFormComponent},
      {path: 'roles', component: RolesListComponent},
      {path: 'roles/form', component: RolesFormComponent},
      {path: 'roles/form/:id', component: RolesFormComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
