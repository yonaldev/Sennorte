import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoDialogDetallesComponent } from './demo-dialog-detalles.component';
import { MaterialModule } from 'app/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    DemoDialogDetallesComponent
  ]
})
export class DemoDialogDetallesModule { }
