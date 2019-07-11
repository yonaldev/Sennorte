import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/material.module';
import { ScrollToModule } from 'ng2-scroll-to-el';

import { FormulaComponent } from './formula.component';
import { TableFormulaComponent } from './table-formula/table-formula.component';
import { DialogFormulaComponent } from './dialog-formula/dialog-formula.component';
import { DialogMedicamentoComponent } from '../medicamento/dialog-medicamento/dialog-medicamento.component';
import { DialogVerFormulaComponent } from './dialog-ver-formula/dialog-ver-formula.component';
import { DialogEditarFormulaComponent, 
          DialogEditarMedicamentoRecetaComponent, 
          DialogAddMedicamentoRecetaComponent 
        } from './dialog-editar-formula/dialog-editar-formula.component';

registerLocaleData(es);

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    ScrollToModule.forRoot()
  ],
  declarations: [
    FormulaComponent,
    TableFormulaComponent,
    DialogFormulaComponent,
    DialogVerFormulaComponent,
    DialogEditarFormulaComponent,
    DialogEditarMedicamentoRecetaComponent,
    DialogAddMedicamentoRecetaComponent
  ],
  entryComponents: [
    DialogFormulaComponent,
    DialogMedicamentoComponent,
    DialogVerFormulaComponent,
    DialogEditarFormulaComponent,
    DialogEditarMedicamentoRecetaComponent,
    DialogAddMedicamentoRecetaComponent
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ]
})
export class FormulaModule { }
