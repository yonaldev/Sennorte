import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogEditarUsuarioModule } from './../dialog-editar-usuario/dialog-editar-usuario.module';
import { TableUsuarioComponent } from './table-usuario.component';

import { MaterialModule } from '../../../../material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MaterialModule,

    DialogEditarUsuarioModule
  ],
  declarations: [
    // TableUsuarioComponent
  ]
})
export class TableUsuarioModule { }
