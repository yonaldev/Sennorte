import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavigationMapComponent } from './navigation-map.component';
import { MaterialModule } from 'app/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ], 
  declarations: [
    NavigationMapComponent
  ]
})
export class NavigationMapModule { }
