import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material.module';
import { DialogEditarMedicamentoComponent } from './dialog-editar-medicamento.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DialogEditarMedicamentoComponent
  ]
})
export class DialogEditarMedicamentoModule { }
