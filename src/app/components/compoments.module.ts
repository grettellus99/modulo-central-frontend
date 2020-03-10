import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { CardComponent } from './card/card.component';
import { SpeedbarComponent } from './speedbar/speedbar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TreeNavegationComponent } from './tree-navegation/tree-navegation.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DeviceCardComponent } from './device-card/device-card.component';
import { LoadingComponent } from './loading/loading.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { AvatarComponent } from './avatar/avatar.component';
import { UserComponent } from './user/user.component';
import { UserCardComponent } from './user-card/user-card.component';
import { EntitlementTreeComponent } from './entitlement-tree/entitlement-tree.component';
import { AddContactDialogComponent } from './add-contact-dialog/add-contact-dialog.component';
import { DeleteContactDialogComponent } from './delete-contact-dialog/delete-contact-dialog.component';
import { DetailsDialogComponent } from './details-dialog/details-dialog.component';
import { LoginFeaturesComponent } from './login-features/login-features.component';
import {ProgressBarModule} from 'primeng/progressbar';
import { GaugeComponent } from './gauge/gauge.component';
import {GaugeModule} from 'angular-gauge';
// import { DxCircularGaugeModule } from 'devextreme-angular';
import {GaugeProModule} from './gauge-pro/gauge-pro.component';
// import { GaugeProComponent } from './gauge-pro/gauge-pro.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    ProgressBarModule,
    GaugeModule.forRoot(),
    GaugeProModule,
    // DxCircularGaugeModule,

  ],
  declarations: [
    AvatarComponent,
    UserComponent,
    UserCardComponent,
    LoginComponent,
    CardComponent,
    SpeedbarComponent,
    UsuariosComponent,
    TreeNavegationComponent,
    MainNavComponent,
    MainMenuComponent,
    DeviceCardComponent,
    LoadingComponent,
    ErrorMessageComponent,
    EntitlementTreeComponent,
    AddContactDialogComponent,
    DeleteContactDialogComponent,
    DetailsDialogComponent,
    LoginFeaturesComponent,
    GaugeComponent,
    // GaugeProComponent,
  ],
  exports: [
    AvatarComponent,
    UserComponent,
    UserCardComponent,
    LoginComponent,
    CardComponent,
    SpeedbarComponent,
    UsuariosComponent,
    TreeNavegationComponent,
    MainNavComponent,
    MainMenuComponent,
    DeviceCardComponent,
    LoadingComponent,
    ErrorMessageComponent,
    EntitlementTreeComponent,
    LoginFeaturesComponent,
  ],
  entryComponents: [AddContactDialogComponent, DeleteContactDialogComponent, DetailsDialogComponent],
})
export class ComponentsModule { }
