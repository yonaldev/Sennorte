import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';
import { JarwisService } from 'app/services/jarwis.service';
import swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cama-habitacion',
  templateUrl: './cama-habitacion.component.html',
  styleUrls: ['./cama-habitacion.component.scss'],
  animations: fuseAnimations
})
export class CamaHabitacionComponent implements OnInit {

  dataSourceHabitacion: MatTableDataSource<any>;
  dataSourceCama: MatTableDataSource<any>;
  columnsHabitacion = ['num'];
  columnsCama = ['num', 'habitacion'];

  vista = true;

  habitaciones = [];
  camas = [];

  habitacion = {
    habitacion: null,
    tipoRegistro: 1
  };

  cama = {
    tipoRegistro: 2,
    cama: null,
    habitacion: null
  };

  constructor(
    private _fuseSidebarService: FuseSidebarService,
    private _jarwis: JarwisService
  ) {
    this._jarwis.getHabitacion()
        .subscribe(
          data => this.habitaciones = data
        );
    this._jarwis.getCama()
        .subscribe(
          data => this.camas = data
        );
  }

  ngOnInit(): void {
  }

  sendHabitacion(): void {
    this._jarwis.registrarPeticion(this.habitacion)
        .subscribe(
          data => {
            if (data) {
              swal({
                type: 'success',
                title: 'Se ha guardado la habitación',
                toast: true,
                showConfirmButton: false
              });
            }
            this.habitacion = {
              habitacion: null,
              tipoRegistro: 1
            };
          }
        );
  }

  sendCama(): void {
    this._jarwis.registrarPeticion(this.cama)
        .subscribe(
          data => {
            if (data) {
              swal({
                type: 'success',
                title: 'Se ha guardado la cama',
                toast: true,
                showConfirmButton: false
              });
            }
            this.cama = {
              cama: null,
              habitacion: null,
              tipoRegistro: 2
            };
          }
        );
  }

  toggleSidebar(name): void {
    this._fuseSidebarService.getSidebar(name).toggleOpen();
  }

}
