import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MaterialModule } from 'app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import 'hammerjs';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule, FuseThemeOptionsModule, FuseHighlightModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { UserComponent } from './main/authentication/user/user.component';
import { MailConfirmComponent } from './main/authentication/mail-confirm/mail-confirm.component';
import { SampleModule } from 'app/main/admin/sample/sample.module';
import { HomeModule } from './main/admin/home/home.module';
import { ResidenteModule } from './main/admin/gestion-residente/residente/residente.module';
import { AcudienteModule } from './main/admin/gestion-residente/acudiente/acudiente.module';
import { Login2Component } from 'app/main/authentication/login-2/login-2.component';
import { ResetPassword2Component } from 'app/main/authentication/reset-password-2/reset-password-2.component';
import { ForgotPassword2Component } from 'app/main/authentication/forgot-password-2/forgot-password-2.component';
import { Error404Module } from './main/errors/404/error-404.module';
import { GestionUsuarioModule } from './main/admin/gestion-usuario/gestion-usuario.module';
import { DialogResidenteModule } from './main/admin/gestion-residente/residente/dialog-residente/dialog-residente.module';
import { NovedadModule } from './main/admin/novedad/novedad.module';
import { PresentationModule } from './main/presentation/presentation.module';
import { MedicamentoModule } from './main/admin/gestion-medicamento/medicamento/medicamento.module';
import { FormulaModule } from './main/admin/gestion-medicamento/formula/formula.module';
import { AcademyModule } from './main/apps/academy/academy.module';

import { AppRoutingModule } from './/app-routing.module';

import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { FakeDbService } from './fake-db/fake-db.service';
import { ValoracionModule } from './main/admin/gestion-valoracion/valoracion-module';
import { GestionSeguimientoModule } from './main/admin/gestion-seguimiento/gestion-seguimiento.module';
import { CamaHabitacionComponent } from './main/admin/cama-habitacion/cama-habitacion.component';
import { EventosModule } from './main/admin/eventos/eventos.module';
import { GestionPagoModule } from './main/admin/gestion-pago/gestion-pago.module';

// Snotify
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
    declarations: [
        AppComponent,
        ResetPassword2Component,
        Login2Component,
        ForgotPassword2Component,
        MailConfirmComponent,
        UserComponent,
        CamaHabitacionComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Componentes material
        MaterialModule,

        // Ngx Charts
        NgxChartsModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FuseHighlightModule,
        Error404Module,

        // App modules
        LayoutModule,
        SampleModule,
        AcademyModule,
        HomeModule,
        GestionUsuarioModule,
        ResidenteModule,
        AcudienteModule,
        DialogResidenteModule,
        NovedadModule,
        MedicamentoModule,
        PresentationModule,
        FormulaModule,
        ValoracionModule,
        GestionSeguimientoModule,
        EventosModule,
        GestionPagoModule,

        // App_Routes
        AppRoutingModule,

        HomeModule,

        // Snotify Recuperacion contraseña
        SnotifyModule

    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        JarwisService,
        TokenService,
        AuthService,
        AfterLoginService,
        BeforeLoginService,
        FakeDbService,
        // Snotify
        { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
    ]
})
export class AppModule
{
}
