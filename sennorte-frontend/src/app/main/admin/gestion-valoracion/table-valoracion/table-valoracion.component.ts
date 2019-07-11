import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { JarwisService } from 'app/services/jarwis.service';
import { MatTableDataSource, MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogValoracionComponent } from '../dialog-valoracion/dialog-valoracion.component';
import { ListValoracionComponent } from '../list-valoracion/list-valoracion.component';


import 'rxjs/add/operator/map';


@Component({
  selector: 'table-valoracion',
  templateUrl: './table-valoracion.component.html',
  styleUrls: ['./table-valoracion.component.scss']
})
export class TableValoracionComponent implements OnInit {

  displayedColumns = ['documento', 'nombrecompleto', 'apellido', 'accion'];

  dataSource: MatTableDataSource<any>;
  id: number;
  valoracion: any[] = [];


  constructor(
    private _jarwis: JarwisService,
    private _dialog: MatDialog,

  ) {
  }

  ngOnInit(): void {
    this.getResidente();
  }

  getResidente(): any {
    this._jarwis.valoracionR().subscribe(
      data => this.dataSource = new MatTableDataSource(data),
    );
  }


  // MODAL AGREGAR VALORACION
  ModalValoracion(row: any): any {


    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'border-rounded';
    dialogConfig.data = row;

    const id: number = row.id_residente;


    this._jarwis.getValoracion(id).subscribe(
      data => this.valoracion = data);


    setTimeout(() => {
      if (this.valoracion.length === 0) {

        this._dialog.open(DialogValoracionComponent, dialogConfig);

      } else {

        this._dialog.open(ListValoracionComponent, dialogConfig);

      }
    }, 2000);
  }
  
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
    
  }
}
