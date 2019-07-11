import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'app/services/jarwis.service';
import { MatTableDataSource } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-evento-dialog',
  templateUrl: './evento-dialog.component.html',
  styleUrls: ['./evento-dialog.component.scss'],
  animations: fuseAnimations
})
export class EventoDialogComponent implements OnInit {

  dataSource: MatTableDataSource<any>;

  displayedColumns = ['titulo', 'fecha', 'hora', 'accion'];

  constructor(
    private _jarwis: JarwisService
  ) {
    this.getEventos();

  }

  ngOnInit(): void {
  }

  getEventos(): void {
    this._jarwis.getEventos()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
        }
      );
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id): void {
    swal({
      type: 'question',
      title: '¿Segúro que desea eliminar el evento?',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this._jarwis.deleteEvento(id)
          .subscribe(
            data => {
              this.getEventos();
              this.handleResponse(data);
            },
            error => {
              this.handleError(error);
            }
          );
      } else if (result.dismiss) {
        swal({
          type: 'warning',
          title: 'Acción cancelada',
          toast: true,
          showConfirmButton: false,
          timer: 5000,
          position: 'top-right'
        });
      }
    });
  }

  handleResponse(data): void {
    if (data) {
      swal({
        type: 'success',
        title: 'Evento eliminado satisfactoriamente',
        timer: 3000,
        showConfirmButton: true
      });
    }
  }

  handleError(error): void {
    if (error.error.error) {
      swal({
        type: 'error',
        title: 'Error al intentar eliminar el evento'
      });
    }
  }

}
