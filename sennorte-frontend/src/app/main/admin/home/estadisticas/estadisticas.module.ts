import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from './estadisticas.component';

import { MaterialModule } from 'app/material.module';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  imports: [
    CommonModule,

    MaterialModule,
    RouterModule,
    FuseSharedModule
  ],
  declarations: [
    // EstadisticasComponent
  ]
})
export class EstadisticasModule { }
