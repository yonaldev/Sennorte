import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    PresentationComponent
  ]
})
export class PresentationModule { }
