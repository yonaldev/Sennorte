import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { Error404Component } from 'app/main/errors/404/error-404.component';

import { MaterialModule } from 'app/material.module';

@NgModule({
    declarations: [
        Error404Component
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,

        MaterialModule
    ]
})
export class Error404Module
{
}
