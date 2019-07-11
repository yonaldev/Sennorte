import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSlideToggleChange, MatDialogConfig } from '@angular/material';
import swal from 'sweetalert2';
import { DialogSeguimientoComponent } from '../dialog-seguimiento/dialog-seguimiento.component';
import { JarwisService } from 'app/services/jarwis.service';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroupName, FormGroup, FormControl } from '@angular/forms';
import { ListInformeComponent } from '../list-informe/list-informe.component';

@Component({
  selector: 'table-seguimiento',
  templateUrl: './table-seguimiento.component.html',
  styleUrls: ['./table-seguimiento.component.scss']
})
export class TableSeguimientoComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 

  constructor(
    private _dialog: MatDialog,
    private jarwis: JarwisService,
    private matDialog: MatDialog,
    private _auth: AuthService,
    private _router: Router
  ) { }
  
  displayedColumns = ['documento', 'nombrecompleto', 'apellido', 'accion'];
  public dataSource;
  isChecked = false;
  
  form: FormGroup = new FormGroup({
    id_residente: new FormControl('') ,
    nombre1_residente: new FormControl(''),
    nombre2_residente: new FormControl(''),
    apellido_residente: new FormControl(''),

  });
  
  ngOnInit(): void {
    
    this.getResidente();
  }

  
// LISTADO DE RESIDENTES
  getResidente(): void {
    this.jarwis.seguimientoR().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        // console.log(data);
      }
    );
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
  
    // MODAL AGREGAR INFORME
  ModalS(row: any): any {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'border-rounded';
    dialogConfig.data = row;
    
    this._dialog.open(DialogSeguimientoComponent, dialogConfig);
    
  }

  // MODAL LISTAR INFORMES SEGUN ID RESIDENTE
  listarInforme(row: any): any{
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'border-rounded';
    dialogConfig.data = row;
    
    this._dialog.open(ListInformeComponent, dialogConfig);
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

