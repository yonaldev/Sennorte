import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSlideToggleChange, MatDialog, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert2';
import { DialogResidenteComponent } from '../dialog-residente/dialog-residente.component';
import { JarwisService } from '../../../../../services/jarwis.service';
import { AuthService } from 'app/services/auth.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'table-residentes',
  styleUrls: ['table-residentes.component.scss'],
  templateUrl: 'table-residentes.component.html',
})
export class TableResidentesComponent implements OnInit {
  displayedColumns = ['documento', 'nombreCompleto', 'acudiente', 'accion'];

  public dataSource;

  residentes = [];

  isChecked = false;

  rol: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private jarwis: JarwisService,
    private _auth: AuthService
  ) {

    this.rol = this._auth.getRol();

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    this.dataSource.paginator._intl.firstPageLabel = 'Página inicial';
    this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.sort = this.sort;
    
    this.getResidente();

  }

  getResidente(): void{
    this.jarwis.getResidente().subscribe(
    data => {
      this.residentes = data;
      this.getStatus(1);
    });
 
   }

  public toggle(event: MatSlideToggleChange ): any {
    if (!event.checked) {
      this.getStatus(1);
    } else if (event.checked) {
      this.getStatus(0);
    }
  }

  getStatus(status): void {
    if (status === 1) {
      this.dataSource = new MatTableDataSource(this.residentes.filter(x => x.estado === 1));
    } else if (status === 0) {
      this.dataSource = new MatTableDataSource(this.residentes.filter(x => x.estado === 0));
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

  public openModalResidente(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1400px';
    dialogConfig.panelClass = ['border-rounded'];

   const dialogOpen = this.dialog.open(DialogResidenteComponent, dialogConfig);
    
    dialogOpen.afterClosed().subscribe(
      response => this.getResidente()
    );

  }

  changeStatus(status, id): void {

    const TIPO = status === 1 ? 'habilitar' : status === 0 ? 'inhabilitar' : '';

    swal({
      type: 'question',
      title: `¿Esta seguro que desea ${TIPO} al residente?`,
      showConfirmButton: true,
      confirmButtonText: 'Si',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then(result => {
      if (result.value) {
        const value = {
          status: status
        };
        this.jarwis.changeStatusResidente(value, id)
            .subscribe(data => {
              this.getResidente();
              this.isChecked = false;
            });
      }
    });
  }
 
} 

export interface ResidenteData {
  documento: string;
  nombreCompleto: string;
  acudiente: string;
}
