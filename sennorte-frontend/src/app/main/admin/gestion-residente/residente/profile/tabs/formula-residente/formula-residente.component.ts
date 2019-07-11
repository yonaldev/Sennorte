import { Component, OnInit, Input } from '@angular/core';
import { JarwisService } from 'app/services/jarwis.service';
import { DialogVerFormulaComponent } from 'app/main/admin/gestion-medicamento/formula/dialog-ver-formula/dialog-ver-formula.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogFormulaComponent } from 'app/main/admin/gestion-medicamento/formula/dialog-formula/dialog-formula.component';

@Component({
  selector: 'formula-residente',
  templateUrl: './formula-residente.component.html',
  styleUrls: ['./formula-residente.component.scss']
})
export class FormulaResidenteComponent implements OnInit {

  @Input() doc: any;

  formulas: any = [];

  constructor(
    private _jarwis: JarwisService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarFormulas();
  }

  verFormula(data): void {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.data = data;

    this._dialog.open(DialogVerFormulaComponent, dialogConfig);
  }

  listarFormulas(): void {
    this._jarwis.searchFormula(this.doc).subscribe(
      data => this.formulas = data
    );
  }

  openModalFormula(id): void {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.width = '800px';
    dialogConfig.maxHeight = '600px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = id;

    const ref = this._dialog.open(DialogFormulaComponent, dialogConfig);

    ref.afterClosed()
      .subscribe(
        () => this.listarFormulas()
      );
  }

}
