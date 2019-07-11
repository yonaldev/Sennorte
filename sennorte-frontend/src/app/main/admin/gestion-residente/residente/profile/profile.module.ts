import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { RouterModule } from '@angular/router';

import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileTimelineComponent } from './tabs/timeline/timeline.component';
import { ProfileAboutComponent } from './tabs/about/about.component';
import { ProfilePhotosVideosComponent } from './tabs/photos-videos/photos-videos.component';
import { FormulaResidenteComponent } from './tabs/formula-residente/formula-residente.component';
import { MaterialModule } from 'app/material.module';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent,
        FormulaResidenteComponent
    ],
    imports     : [

        MaterialModule,

        FuseSharedModule,
        RouterModule
    ],
    providers   : [
        ProfileService
    ]
})
export class ProfileModule
{
}
