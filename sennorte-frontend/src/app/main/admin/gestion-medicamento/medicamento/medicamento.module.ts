import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/material.module';

import { FuseSharedModule } from '@fuse/shared.module';

import { MedicamentoComponent } from './medicamento.component';

import { TableMedicamentoComponent } from './table-medicamento/table-medicamento.component';

import { DialogMedicamentoModule } from './dialog-medicamento/dialog-medicamento.module';
import { DialogMedicamentoComponent } from './dialog-medicamento/dialog-medicamento.component';
import { DialogEditarMedicamentoComponent } from './dialog-editar-medicamento/dialog-editar-medicamento.component';
import { DialogEditarMedicamentoModule } from './dialog-editar-medicamento/dialog-editar-medicamento.module';
import { MedicamentoService } from './medicamento.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    DialogMedicamentoModule,
    DialogEditarMedicamentoModule
    
  ],
  declarations: [
    MedicamentoComponent,
    TableMedicamentoComponent
  ],
  entryComponents: [
    DialogMedicamentoComponent,
    DialogEditarMedicamentoComponent
  ],
  providers: [
    MedicamentoService
  ]
  
})
export class MedicamentoModule { }
