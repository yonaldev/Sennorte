import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSlideToggleChange, MatDialog, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert2';
import { JarwisService } from '../../../../../services/jarwis.service';

import { DialogMedicamentoComponent } from '../dialog-medicamento/dialog-medicamento.component';

import { DialogEditarMedicamentoComponent } from '../dialog-editar-medicamento/dialog-editar-medicamento.component';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'table-medicamento',
  templateUrl: './table-medicamento.component.html',
  styleUrls: ['./table-medicamento.component.scss']
})
export class TableMedicamentoComponent implements OnInit {

  displayedColumns = [];
  dataSource: MatTableDataSource<Medicamento>;
  isChecked = false;

  medicamentos: Medicamento[] = [];

  rol: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _jarwis: JarwisService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.rol = this._auth.getRol();
    this.getColumns();
    this.getMedicamentos();
  }  

  getMedicamentos(): void {
    this._jarwis.getMedicamentos().subscribe(
      data => {
        this.medicamentos = data;
        this.getMedicamentosState(1);
      }
    );
  }

  getMedicamentosState(estado): void {
    if (estado === 1) {
      this.dataSource = new MatTableDataSource(this.medicamentos.filter(items => items.estado_medicamento === 1));
      this.configTable();
    } else if (estado === 0){
      this.dataSource = new MatTableDataSource(this.medicamentos.filter(items => items.estado_medicamento === 0));
      this.configTable();
    }
  }

  habilitarMedicamento(name, status, id): void {
    const FLAG = status === 1 ? 'habilitar' : 'inhabilitar';
    swal({
      type                  : 'question',
      title                 : `¿Esta seguro que desea ${FLAG} ${ name }?`,
      width                 : 400,
      showConfirmButton     : true,
      confirmButtonText     : 'Aceptar',
      showCancelButton      : true
    }).then((result) => {
      if (result.value) {
        this.changeStatus(status, id);
      }
    });
  }

  changeStatus(status, id): void {
    const object = {
      status: status,
      id: id
    };

    this._jarwis.changeStatusMedicamento(object).subscribe(
      data => {
        swal({
          type: 'success',
          title: 'Se ha cambiado el estado del medicamento'
        });
        this.getMedicamentos();
        this.isChecked = false;
      },
      error => {
        swal({
          type: 'error',
          title: 'No se ha podido realizar la acción'
        });
        this.getMedicamentos();
      }
    );
  }


  public toggle(event: MatSlideToggleChange ): any {
    if (!event.checked) {
      this.getMedicamentosState(1);
    } else if (event.checked) {
      this.getMedicamentosState(0);
    }
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;

    this._dialog.open(DialogMedicamentoComponent, dialogConfig)
                .afterClosed()
                .subscribe(
                  () => {
                    this.getMedicamentos();
                  }
                );
  }

  openDialogEditar(row: Medicamento): void {
    const configDialog = new MatDialogConfig();
    configDialog.width = '600px';
    configDialog.autoFocus = false;
    configDialog.data = row;
    
    this._dialog.open(DialogEditarMedicamentoComponent, configDialog)
                .afterClosed()
                .subscribe(
                  () => {
                    this.getMedicamentos();
                  }
                );
  }

  configTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    this.dataSource.paginator._intl.firstPageLabel = 'Página inicial';
    this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.sort = this.sort;
  }

  getColumns(): void {
    if (this.rol === '1' || this.rol === '5') {
      this.displayedColumns = ['nombre', 'dosis', 'tipoAplicacion', 'accion'];
    } else {
      this.displayedColumns = ['nombre', 'dosis', 'tipoAplicacion'];
    }
  }

}

export interface Medicamento {
  nombreMedicamento: string;
  dosis: string;
  tipoAplicacion: string;
  unidadMedida: string;
  estado_medicamento: number;
}

