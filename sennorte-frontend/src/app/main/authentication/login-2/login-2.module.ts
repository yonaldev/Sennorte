import { NgModule } from '@angular/core';
import { MaterialModule } from './../../../material.module';

import { FuseSharedModule } from '@fuse/shared.module';

import { Login2Component } from 'app/main/authentication/login-2/login-2.component';

@NgModule({
    declarations: [
        // Login2Component
    ],
    imports     : [

        MaterialModule,

        FuseSharedModule
    ]
})
export class Login2Module
{
}
