import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSortHeader, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { JarwisService } from 'app/services/jarwis.service';
import { InformeComponent } from '../informe/informe.component';

@Component({
  selector: 'app-list-informe',
  templateUrl: './list-informe.component.html',
  styleUrls: ['./list-informe.component.scss']
})
export class ListInformeComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns = ['fechaC', 'idresidente', 'accion'];
  // displayedColumns = ['documento', 'nombreCompleto', 'apellido', 'accion'];
  public dataSource;
  isChecked = false;
  form: FormGroup;
  
  
  constructor(
    private _matDialogRef: MatDialogRef<ListInformeComponent>,
    private _dialog: MatDialog,
    private _jarwis: JarwisService,
    
    @Inject(MAT_DIALOG_DATA) private list  ) 
    { 

      this.form = new  FormGroup({
          'id_seguimiento_diario': new FormControl(''),
          'informe': new FormControl(''),
          'fecha_creacion_informe': new FormControl(''),
          'fecha_update_informe': new FormControl(''), 
          'id_residente': new FormControl('')
        });

    }
       
    ngOnInit(): any {
      
      this.listar();
    }

   
    listar(): any{
      this._jarwis.listarInforme(this.list).subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          // console.log(data);
         },
          error => console.log(error),
        
      );
    }
    
    ModalS(row: any): any {
    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.disableClose = true;
      dialogConfig.width = '600px';
      dialogConfig.panelClass = 'border-rounded';
      dialogConfig.data = row;
      
      this._dialog.open(InformeComponent, dialogConfig);
      
    }


  configPaginator(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    this.dataSource.paginator._intl.firstPageLabel = 'Página inicial';
    this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.sort = this.sort;
  }
  public close(): void{
    this._matDialogRef.close();
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
