import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'app/material.module';
import { TableValoracionComponent } from './table-valoracion/table-valoracion.component';
import { GestionValoracionComponent } from './gestion-valoracion.component';
import { DialogValoracionComponent } from './dialog-valoracion/dialog-valoracion.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { ListValoracionComponent } from './list-valoracion/list-valoracion.component';

@NgModule({
    declarations: [ 
        TableValoracionComponent, 
        GestionValoracionComponent, 
        DialogValoracionComponent, 
        ListValoracionComponent
    ],
    imports: [ 
        CommonModule, 
        MaterialModule, 
        FuseSharedModule 
    ],
    entryComponents: [ 
        DialogValoracionComponent, 
        ListValoracionComponent 
    ]
})

export class ValoracionModule {}
