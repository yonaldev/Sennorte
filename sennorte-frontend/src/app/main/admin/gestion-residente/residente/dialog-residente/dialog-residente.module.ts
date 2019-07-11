import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MaterialModule } from '../../../../../material.module';
import { DialogResidenteComponent } from './dialog-residente.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserModule
  ],
  declarations: [
    DialogResidenteComponent
  ],
  providers: [
    DatePipe
  ]
})
export class DialogResidenteModule { }
