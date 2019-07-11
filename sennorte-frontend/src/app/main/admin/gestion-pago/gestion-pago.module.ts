import { NgModule } from '@angular/core';
import { TablePagoComponent } from './table-pago/table-pago.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/material.module';
import { CommonModule } from '@angular/common';
import { GestionPagoComponent } from './gestion-pago.component';
import { DialogPagoComponent } from './dialog-pago/dialog-pago.component';
import { ListPagoComponent } from './list-pago/list-pago.component';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule

  ],

  declarations: [

    GestionPagoComponent,
    TablePagoComponent,
    DialogPagoComponent,
    ListPagoComponent

  ],
  entryComponents: [
    DialogPagoComponent,
    ListPagoComponent
  ]
})
export class GestionPagoModule { }
