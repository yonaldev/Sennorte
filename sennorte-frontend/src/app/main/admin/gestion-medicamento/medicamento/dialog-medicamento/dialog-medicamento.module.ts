import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogMedicamentoComponent } from './dialog-medicamento.component';

import { MaterialModule } from 'app/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DialogMedicamentoComponent
  ]
})
export class DialogMedicamentoModule { }
