import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NovedadComponent } from './novedad.component';
import { DemoDialogDetallesModule } from './demo-dialog-detalles/demo-dialog-detalles.module';
import { DemoDialogDetallesComponent } from './demo-dialog-detalles/demo-dialog-detalles.component';

import { MaterialModule } from 'app/material.module';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    DemoDialogDetallesModule,

    RouterModule
  ],
  declarations: [
    NovedadComponent
  ],
  entryComponents: [
    DemoDialogDetallesComponent
  ]
})
export class NovedadModule { }
