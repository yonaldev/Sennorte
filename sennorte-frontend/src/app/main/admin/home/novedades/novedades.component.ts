import { Component, OnInit } from '@angular/core';
import { JarwisService } from 'app/services/jarwis.service';
import { AuthService } from 'app/services/auth.service';
import { fuseAnimations } from '@fuse/animations';

import swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DemoDialogDetallesComponent } from '../../novedad/demo-dialog-detalles/demo-dialog-detalles.component';

@Component({
  selector: 'novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.scss'],
  animations: fuseAnimations
})
export class NovedadesComponent implements OnInit {

  date = new Date();
  fechaActual: string;
  y: any;
  m: any;
  d: any;

  flagnovedades = false;
  items = []; // Este objeto esta en constante cambio
  itemsImportant = []; // Este objeto contiene todo el tiempo, todas las novedades
  tipoUsuario = this.auth.getRol(); // Variable que guarda el tipo de usuario que esta loggeado

  selected = '1';

  constructor(
    private jarwis: JarwisService,
    private auth: AuthService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getNovedades();
  }

  getFecha(): string {
    this.y = this.date.getFullYear();
    this.m = this.date.getMonth() + 1;
    this.d = this.date.getDay();

    return `${this.y}/${this.m}/${this.d}`;
  }

  getNovedades(): any {
    return this.jarwis.getNovedades().subscribe(
      data => { this.items = data; this.itemsImportant = data.filter(item => item.importancia === 1); },
      error => this.handleError(error)
    );
  }

  handleError(error): void {
    swal({
      type: 'error',
      title: 'Error al cargar las novedades'
    });
  }

  openModal(data): any {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.data = data;
    
    this._dialog.open(DemoDialogDetallesComponent, dialogConfig);

  }

  deleteNovedad(id_novedad): any {
    swal({
      type                  : 'question',
      title                 : `¿Está seguro que desea borrar la novedad?`,
      width                 : 400,
      showConfirmButton     : true,
      confirmButtonText     : 'Aceptar',
      showCancelButton      : true,
      cancelButtonText      : 'Cancelar'
    }).then((result) => {
      if (result.value) {
        return this.jarwis.deleteNovedad(id_novedad).subscribe(
          data => {this.handleResponseDelete(data); this.getNovedades(); },
          error => this.handleErrorDelete(error)
        );
      }
    }); 
  }

  handleResponseDelete(data): any {
    swal({
      type: 'success',
      title: 'Accion completada'
    });
  }

  handleErrorDelete(error): any {
    swal({
      type: 'error',
      title: 'No se ha podido borrar la publicación'
    });
  }

}
