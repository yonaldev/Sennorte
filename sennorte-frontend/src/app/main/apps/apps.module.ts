import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { NavigationMapComponent } from './navigation-map/navigation-map.component';
import { NavigationMapModule } from './navigation-map/navigation-map.module';

const routes = [
    {
        path        : 'academy',
        loadChildren: './academy/academy.module#AcademyModule'
    },
    {
        path        : 'navigation-map',
        component   : NavigationMapComponent 
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        NavigationMapModule
    ],
    declarations: []
})
export class AppsModule
{
}
