import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventosComponent } from './eventos.component';
import { MaterialModule } from 'app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { EventoDialogComponent } from './evento-dialog/evento-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FuseSharedModule
  ],
  declarations: [
    EventosComponent,
    EventoDialogComponent
  ],
  entryComponents: [
    EventoDialogComponent
  ]
})
export class EventosModule { }
