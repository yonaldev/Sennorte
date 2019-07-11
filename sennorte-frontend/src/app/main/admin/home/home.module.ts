import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/material.module';

import { HomeComponent } from './home.component';
import { NovedadesComponent } from './novedades/novedades.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    NovedadesComponent,
    EstadisticasComponent
  ]
})
export class HomeModule { }
