
import { NgModule } from '@angular/core';

import { DialogSeguimientoComponent } from './dialog-seguimiento/dialog-seguimiento.component';
import { TableSeguimientoComponent } from './table-seguimiento/table-seguimiento.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/material.module';
import { GestionSeguimientoComponent } from './gestion-seguimiento.component';
import { ListInformeComponent } from './list-informe/list-informe.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { InformeComponent } from './informe/informe.component';

@NgModule({
    declarations: [
        GestionSeguimientoComponent,
        DialogSeguimientoComponent,

        TableSeguimientoComponent,

        ListInformeComponent,
        InformeComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule, 
        MatCheckboxModule, 
        MatFormFieldModule, 
        MatInputModule,

        FuseSharedModule,

        MaterialModule
        
    ], 
    entryComponents: [
        DialogSeguimientoComponent,
        ListInformeComponent,
        InformeComponent
    ]

})

export class GestionSeguimientoModule
{
}
