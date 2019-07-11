import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ResidenteComponent } from './residente.component';

import { TableResidentesComponent } from './table-residentes/table-residentes.component';
import { DialogResidenteComponent } from './dialog-residente/dialog-residente.component';
import { DialogResidenteModule } from './dialog-residente/dialog-residente.module';
import { ProfileModule } from './profile/profile.module';
import { RouterModule } from '@angular/router';
import { EditResidenteComponent } from './edit-residente/edit-residente.component';


@NgModule({
    declarations: [
        ResidenteComponent,
        
        TableResidentesComponent,
        
        EditResidenteComponent,
       
      ],
    imports     : [
        FuseSharedModule,
        RouterModule,
        MaterialModule,

        DialogResidenteModule,
        ProfileModule,

        ReactiveFormsModule,
        FormsModule
    ], 
    entryComponents: [
        DialogResidenteComponent
    ]
})
export class ResidenteModule
{
}
