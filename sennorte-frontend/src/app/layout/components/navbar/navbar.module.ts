import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarComponent } from 'app/layout/components/navbar/navbar.component';
import { NavbarVerticalStyle1Module } from 'app/layout/components/navbar/vertical/style-1/style-1.module';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { MatListModule } from '@angular/material';
@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports     : [
        FuseSharedModule,
        NavbarVerticalStyle1Module,
        MatListModule
    ],
    exports     : [
        NavbarComponent
    ], 
    providers   : [
        ToolbarComponent
    ]
})
export class NavbarModule
{
}
