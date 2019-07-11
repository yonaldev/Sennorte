import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DialogEditarUsuarioComponent } from './dialog-editar-usuario.component';
import { MaterialModule } from '../../../../material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    FormsModule,
    MaterialModule
  ],
  declarations: [
    DialogEditarUsuarioComponent
  ]
})
export class DialogEditarUsuarioModule { }
