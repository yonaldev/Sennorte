import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'app/services/jarwis.service';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { DialogPagoComponent } from '../dialog-pago/dialog-pago.component';
import { ListPagoComponent } from '../list-pago/list-pago.component';

@Component({
  selector: 'table-pago',
  templateUrl: './table-pago.component.html',
  styleUrls: ['./table-pago.component.scss']
})
export class TablePagoComponent implements OnInit {

  displayedColumns = ['nombreResidente', 'nombreAcudiente', 'fecha', 'accion'];

  public dataSource; 


  constructor(
    private _jarwis: JarwisService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getInfoPago();
  }

  getInfoPago(): any{
    this._jarwis.getInfoPagos().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  pagar(): any {

  }
  ModalF(row: any): any {
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.disableClose = true;
      dialogConfig.width = '600px';
      dialogConfig.panelClass = 'border-rounded';
      dialogConfig.data = row;
      
      this._dialog.open(DialogPagoComponent, dialogConfig);
      
    }
    ModalH(row: any): any {
      
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false;
      dialogConfig.disableClose = true;
      dialogConfig.width = '600px';
      dialogConfig.panelClass = 'border-rounded';
      dialogConfig.data = row;
      
      this._dialog.open(ListPagoComponent, dialogConfig);
      
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
