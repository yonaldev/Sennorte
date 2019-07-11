import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importacion componentes de autenticacion
import { Login2Component } from './main/authentication/login-2/login-2.component';
import { ResetPassword2Component } from './main/authentication/reset-password-2/reset-password-2.component';
import { ForgotPassword2Component } from './main/authentication/forgot-password-2/forgot-password-2.component';
import { MailConfirmComponent } from './main/authentication/mail-confirm/mail-confirm.component';

// importacion componentes principales
import { PresentationComponent } from './main/presentation/presentation.component';
import { HomeComponent } from './main/admin/home/home.component';
import { ResidenteComponent } from './main/admin/gestion-residente/residente/residente.component';
import { AcudienteComponent } from './main/admin/gestion-residente/acudiente/acudiente.component';
import { ProfileComponent } from './main/admin/gestion-residente/residente/profile/profile.component';
import { GestionUsuarioComponent } from './main/admin/gestion-usuario/gestion-usuario.component';
import { NovedadComponent } from './main/admin/novedad/novedad.component';
import { EventosComponent } from './main/admin/eventos/eventos.component';

// Importacion de componentes de configuracion
import { UserComponent } from './main/authentication/user/user.component';
import { MedicamentoComponent } from './main/admin/gestion-medicamento/medicamento/medicamento.component';

// Importacion de componentes de excepcion 
import { Error404Component } from './main/errors/404/error-404.component';
import { FormulaComponent } from './main/admin/gestion-medicamento/formula/formula.component';
import { GestionValoracionComponent } from './main/admin/gestion-valoracion/gestion-valoracion.component';
import { GestionSeguimientoComponent } from './main/admin/gestion-seguimiento/gestion-seguimiento.component';
import { EditResidenteComponent } from './main/admin/gestion-residente/residente/edit-residente/edit-residente.component';

import { CamaHabitacionComponent } from './main/admin/cama-habitacion/cama-habitacion.component';
import { GestionPagoComponent } from './main/admin/gestion-pago/gestion-pago.component';
import { BeforeLoginService } from './services/before-login.service';


const APP_ROUTES: Routes = [
  { path: '', component: PresentationComponent },
  { path: 'auth/login', component: Login2Component },
  { path: 'auth/reset-password', component: ResetPassword2Component},
  { path: 'auth/forgot-password', component: ForgotPassword2Component },
  { path: 'auth/mail-confirmation/:email', component: MailConfirmComponent },

  { path: 'home', component: HomeComponent},
  { path: 'novedades', component: NovedadComponent },
  { path: 'residente', component: ResidenteComponent },
  { path: 'residente/perfil/:id', component: ProfileComponent },
  { path: 'residente/edit/:id/:origen', component: EditResidenteComponent },
  { path: 'acudiente', component: AcudienteComponent },
  { path: 'usuario-control', component: GestionUsuarioComponent },
  { path: 'formula', component: FormulaComponent },
  { path: 'pagos', component: GestionPagoComponent },

  { path: 'seguimiento/valoracion-inicial', component: GestionValoracionComponent },
  { path: 'seguimiento/seguimiento-diario', component: GestionSeguimientoComponent },

  { path: 'eventos', component: EventosComponent },
  { path: 'evento', redirectTo: 'eventos' },

  { path: 'apps', loadChildren: './main/apps/apps.module#AppsModule' },

  { path: 'config/cuenta', component: UserComponent },
  { path: 'config/medicamento', component: MedicamentoComponent },
  { path: 'config/habitacion-cama', component: CamaHabitacionComponent },

  { path: '404', component: Error404Component },
  { path: '**', pathMatch: 'full', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
