import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JarwisService } from 'app/services/jarwis.service';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-dialog-ver-formula',
  templateUrl: './dialog-ver-formula.component.html',
  styleUrls: ['./dialog-ver-formula.component.scss']
})
export class DialogVerFormulaComponent implements OnInit {

  rol: string;

  displayedColumns = ['medicamento', 'especificacion'];
  dataSorce: MatTableDataSource<Receta>;

  constructor(
    private _jarwis: JarwisService,
    private _dialogRef: MatDialogRef<DialogVerFormulaComponent>,
    private _auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.rol = this._auth.getRol();
    this.getRecetaByFormula(this.data.id_formula);
  }

  getRecetaByFormula(value): void {
    this._jarwis.getReceta(value).subscribe(
      response => {
        this.dataSorce = new MatTableDataSource(response);
      }
    );
  }

  close(): void {
    this._dialogRef.close();
  }

}

export interface Receta {
  nombre_medicamento: string;
  dosis_medicamento: number;
  lapso: number;
  dias: number;
  dosis: number;
  unidad_medida: string;
  nombre_aplicacion: string;
}


