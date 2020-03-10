import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PagesModule} from './pages/pages.module';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './core/auth/auth.guard';
import {AuthInterceptor} from './core/auth/auth.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ComponentsModule} from './components/compoments.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,

  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
