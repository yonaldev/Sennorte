import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { DialogFormulaComponent } from '../dialog-formula/dialog-formula.component';
import { JarwisService } from 'app/services/jarwis.service';
import { DialogVerFormulaComponent } from '../dialog-ver-formula/dialog-ver-formula.component';
import { formatDate } from '@angular/common';
import { DialogEditarFormulaComponent } from '../dialog-editar-formula/dialog-editar-formula.component';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'table-formula',
  templateUrl: './table-formula.component.html',
  styleUrls: ['./table-formula.component.scss']
})
export class TableFormulaComponent implements OnInit {

  rol: string;

  maxDate = new Date();

  dataSource: MatTableDataSource<Formula>;
  displayedColumns = ['referencia', 'residente', 'fecha', 'medicamentos', 'accion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _jarwis: JarwisService,
    private _auth: AuthService,
    @Inject(LOCALE_ID) private locale: string
  ) { }

  ngOnInit(): void {
    this.rol = this._auth.getRol();
    this.getFormula();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1000px';
    dialogConfig.maxHeight = '600px';
    dialogConfig.autoFocus =  false;

    this._dialog.open(DialogFormulaComponent, dialogConfig)
                .afterClosed()
                .subscribe(
                  result => this.getFormula()
                );
  }

  verFormula(data: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '800px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = data;

    this._dialog.open(DialogVerFormulaComponent, dialogConfig);
  }

  editFormula(id): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.autoFocus = false;
    dialogConfig.data = id;

    this._dialog.open(DialogEditarFormulaComponent, dialogConfig);
  }

  getFormula(): void {
    this._jarwis.getFormula().subscribe(
      data => {
        if (data.fecha_formula) {
          data.fecha_formula = formatDate(data.fecha_formula, 'dd/MM/yyyy', this.locale);
        }
        this.dataSource = new MatTableDataSource(data);
        this.configTable();
      }
    );
  }

  applyFilter(filterValue: string ): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  configTable(): void {
    this.dataSource.paginator = this.paginator;

    this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    this.dataSource.paginator._intl.firstPageLabel = 'Página inicial';
    this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';

  }

}

export interface Formula {
  id_formula: string;
  fecha_formula: string;
  id_residente: string;
  nombre1_residente: string;
  nombre2_residente: string;
  apellido_residente: string;
}
