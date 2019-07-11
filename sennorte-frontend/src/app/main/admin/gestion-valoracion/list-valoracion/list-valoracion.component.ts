import { Component, OnInit, Inject } from '@angular/core';
import { JarwisService } from 'app/services/jarwis.service';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef } from '@angular/material';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-valoracion',
  templateUrl: './list-valoracion.component.html',
  styleUrls: ['./list-valoracion.component.scss']
})
export class ListValoracionComponent implements OnInit {

  displayedColumns: string[] = ['residente', 'familiar', 'quirurgico', 'alergia', 'especialidad', 'cefalocaudal'];
  dataSource: MatTableDataSource<any>;
  infoValoracion: any = [];
  

  constructor(
    private _jarwis: JarwisService,
    private _matDialogRef: MatDialogRef<ListValoracionComponent>,

    @Inject(MAT_DIALOG_DATA) public row
  ) { }

  ngOnInit(): any {
    this.verValoracion();
  }

  verValoracion(): any {
    this._jarwis.getValoracion(this.row.id_residente).subscribe(
      data => {
        this.infoValoracion = data[0];
        this.dataSource = new MatTableDataSource(data);
      },
      error => swal({
        type: 'error',
        title: 'Ha ocurrido un error al mostrar la información requerida'
      })
    );
  }

  public close(): void {
    this._matDialogRef.close();
  }

}
