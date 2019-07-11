import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { ResetPassword2Component } from 'app/main/authentication/reset-password-2/reset-password-2.component';

@NgModule({
    declarations: [
        // ResetPassword2Component
    ],
    imports     : [

        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,

        FuseSharedModule
    ]
})
export class ResetPassword2Module
{
}
