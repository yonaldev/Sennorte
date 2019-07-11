import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog, MatSlideToggleChange, MAT_DIALOG_DATA } from '@angular/material';
import { DialogAcudienteComponent } from '../dialog-acudiente/dialog-acudiente.component';
import { DialogRegistroAcudienteComponent } from '../dialog-registro-acudiente/dialog-registro-acudiente.component';

import { JarwisService } from 'app/services/jarwis.service';
import swal from 'sweetalert2';
import { id } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'table-acudiente',
  templateUrl: './table-acudiente.component.html',
  styleUrls: ['./table-acudiente.component.scss']
})
export class TableAcudienteComponent implements OnInit {

  displayedColumns = ['id_acudiente', 'nombre_acudiente', 'telefono_1', 'telefono_2', 'fecha_nacimiento_acudiente', 'direccion_acudiente', 'id_estado_civil', 'acciones'];
  dataSource: MatTableDataSource<AcudienteData>;
  isChecked = false;

acudientes: AcudienteData[] = [];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private jarwis: JarwisService,
              private dialog: MatDialog) 
  {

  }

  ngOnInit(): void{
    this.getAcudiente();
  }

  getAcudiente(): void {
    this.jarwis.getAcudientes().subscribe(
      data => {
        this.acudientes = data;
        this.getEstadoAcudiente(1);
        this.configPaginator();
    });
  }

  cambiarestado(name, estado, id_acudiente): void {
    const FLAG = estado === 1 ? 'habilitar' : 'inhabilitar'; 
    swal({
      type                  : 'question',
      title                 : `¿Esta seguro que desea ${FLAG} ${ name }?`,
      width                 : 400,
      showConfirmButton     : true,
      confirmButtonText     : 'Aceptar',
      showCancelButton      : true
    }).then((result) => {
      if (result.value) {
        const obj = {
          estado: estado,
          id_acudiente: id_acudiente
        };
    
        this.jarwis.cambiarEstadoAcudiente(obj).subscribe(
          data => {
            swal({
              type: 'success',
              title: 'Se ha cambiado el estado del acudiente'
            });
            this.getAcudiente();
            this.isChecked = false;
          },
          error => {
            swal({
              type: 'error',
              title: 'No se ha podido realizar la acción'
            });
            this.isChecked = true;
            this.getAcudiente();
          }
        );
      }
    });
  }

 openModalAcudiente(): void{
    const dialogConfig = new MatDialogConfig;  
    dialogConfig.autoFocus = false;
    dialogConfig.maxWidth = '800px';
    dialogConfig.width = '700px';

    this.dialog.open(DialogAcudienteComponent, dialogConfig);
  }

  openModalEditar(data): void {
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = false;
    dialogConfig.maxWidth = '800px';
    dialogConfig.width = '700px';
    dialogConfig.data = data;

    const dialogOpen = this.dialog.open(DialogAcudienteComponent, dialogConfig);

    dialogOpen.afterClosed()
              .subscribe(
                response => this.getAcudiente()
              );
  }


  openModalResgistroAcudiente(): void{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;
    dialogConfig.width = '1400px';
    dialogConfig.panelClass = ['border-rounded'];

    const dialogOpen = this.dialog.open(DialogRegistroAcudienteComponent, dialogConfig);

    dialogOpen.afterClosed().subscribe(
        response => this.getAcudiente()
    );
  }
  
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
  }
  
  getEstadoAcudiente(estado): any {
    if (estado === 1) {
      this.dataSource = new MatTableDataSource(this.acudientes.filter(items => items.estado === 1));
      this.configPaginator();
    } else if (estado === 0) {
      this.dataSource = new MatTableDataSource(this.acudientes.filter(items => items.estado === 0));
      this.configPaginator();
    }
  } 
  configPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    this.dataSource.paginator._intl.firstPageLabel = 'Página inicial';
    this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.sort = this.sort;
  }

  public toggle(event: MatSlideToggleChange ): any {
    if (!event.checked) {
      this.getEstadoAcudiente(1);
    } else if (event.checked) {
      this.getEstadoAcudiente(0);
    }
  }

  public inhabilitarAcudiente(id_acudiente, estado, nombre_acudiente): any {
    swal({
      type                  : 'question',
      title                 : `¿Esta seguro que desea inhabilitar al acudiente ${ nombre_acudiente }?`,
      width                 : 400,
      showConfirmButton     : true,
      confirmButtonText     : 'Aceptar',
      showCancelButton      : true,
    }).then((result) => {
      if (result.value) {
      //  this.jarwis.cambiarEstadoAcudiente(estado, id_acudiente);
       console.log(estado);
       console.log(id_acudiente);

      }
    });
  }

}
export interface AcudienteData {
  id_acudiente: string;
  nombre_acudiente: string;
  telefono_1: number;
  telefono_2: number;
  direccion_acudiente: string;
  fecha_nacimiento_acudiente: Date;
  id_estado_civil: number;
  estado: number;
}
