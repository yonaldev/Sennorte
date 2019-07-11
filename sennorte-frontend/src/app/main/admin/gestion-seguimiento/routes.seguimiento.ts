import { Routes, RouterModule } from '@angular/router';


import { DialogSeguimientoComponent } from './dialog-seguimiento/dialog-seguimiento.component';


export const SEGUIMIENTO_ROUTES: Routes = [
    { path: 'generarinforme', component: DialogSeguimientoComponent }


];

