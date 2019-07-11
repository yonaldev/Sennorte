import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { MailConfirmComponent } from 'app/main/authentication/mail-confirm/mail-confirm.component';


@NgModule({
    declarations: [
        // MailConfirmComponent
    ],
    imports     : [
        RouterModule,

        MatIconModule,

        FuseSharedModule
    ]
})
export class MailConfirmModule
{
}
