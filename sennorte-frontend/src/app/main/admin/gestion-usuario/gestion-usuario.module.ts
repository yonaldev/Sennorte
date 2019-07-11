import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { GestionUsuarioComponent } from './gestion-usuario.component';
import { DialogUsuarioModule } from './dialog-usuario/dialog-usuario.module';
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';
import { TableUsuarioComponent } from './table-usuario/table-usuario.component';
import { DialogEditarUsuarioModule } from './dialog-editar-usuario/dialog-editar-usuario.module';
import { DialogEditarUsuarioComponent } from './dialog-editar-usuario/dialog-editar-usuario.component';

import { MaterialModule } from 'app/material.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatFormFieldModule, 
    MatInputModule,
    
    DialogUsuarioModule,
    DialogEditarUsuarioModule,
    
    FuseSharedModule,

    MaterialModule
  ],
  declarations: [
    GestionUsuarioComponent,
    TableUsuarioComponent
  ],
  entryComponents: [
    DialogUsuarioComponent,
    DialogEditarUsuarioComponent
  ]
})
export class GestionUsuarioModule { }
