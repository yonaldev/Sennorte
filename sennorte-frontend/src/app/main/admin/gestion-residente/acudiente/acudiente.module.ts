import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcudienteComponent } from './acudiente.component';
import { TableAcudienteComponent } from './table-acudiente/table-acudiente.component';
import { MaterialModule } from 'app/material.module';
import { DialogAcudienteComponent } from './dialog-acudiente/dialog-acudiente.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogRegistroAcudienteComponent } from './dialog-registro-acudiente/dialog-registro-acudiente.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FuseSharedModule,
    ReactiveFormsModule,
    
  ],
  declarations: [
   AcudienteComponent,
   TableAcudienteComponent,
   DialogAcudienteComponent,
   DialogRegistroAcudienteComponent
  ],
  entryComponents: [
    DialogAcudienteComponent,
    DialogRegistroAcudienteComponent
  ]
})
export class AcudienteModule { }
