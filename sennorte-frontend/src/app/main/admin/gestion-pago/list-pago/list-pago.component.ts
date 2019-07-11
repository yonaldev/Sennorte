import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { JarwisService } from 'app/services/jarwis.service';

@Component({
  selector: 'app-list-pago',
  templateUrl: './list-pago.component.html',
  styleUrls: ['./list-pago.component.scss']
})
export class ListPagoComponent implements OnInit {

  displayedColumns = ['idPago', 'fechaPago', 'valorPago', 'Observacion'];
  dataSource;

  constructor(
    private _matDialogRef: MatDialogRef<ListPagoComponent>,
    private _jarwis: JarwisService,

    @Inject(MAT_DIALOG_DATA) private data,

  ) { }

  ngOnInit(): any{
    this.listarPagos();
  }

  listarPagos(): any{
    this._jarwis.listarpagos(this.data.id_residente).subscribe(
      data => {
        this.dataSource = new  MatTableDataSource(data);
        },
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
  
  public close(): void{
    this._matDialogRef.close();
  }
}
