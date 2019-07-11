import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogUsuarioComponent } from './dialog-usuario.component';
import { MaterialModule } from '../../../../material.module';
import { TableUsuarioComponent } from '../table-usuario/table-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MaterialModule
  ],
  declarations: [
    DialogUsuarioComponent
  ],
  providers: [
    TableUsuarioComponent
  ]
})
export class DialogUsuarioModule { }
