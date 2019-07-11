import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { DemoDialogDetallesComponent } from './demo-dialog-detalles/demo-dialog-detalles.component';

import { JarwisService } from 'app/services/jarwis.service';
import { TokenService } from 'app/services/token.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.scss'],
  animations: fuseAnimations
})
export class NovedadComponent implements OnInit {

  registrarNovedad: FormGroup;

  checked = false;
  colorClass = '';
  form = {
    tipoNovedad: null,
    title: null,
    fecha: this.getFecha(),
    descripcion: null,
    detalles: null,
    urlImagen: null,
    url: null,
    color: '',
    importancia: null
  };

  novedades = [
    {
      tipo: 'Mensaje',
      value: 1
    },
    {
      tipo: 'Información',
      value: 2
    },
    {
      tipo: 'Publicación',
      value: 3
    }
  ];

  constructor(
    private dialog: MatDialog,
    private jarwis: JarwisService,
    private _router: Router,
    private _token: TokenService
    ) { }

  ngOnInit(): void {

    if (!this._token.isValid()) {
      this._router.navigate(['/auth/login']);
      swal({
        type: 'warning',
        titleText: 'No se ha iniciado sesión, debes iniciar sesión',
        toast: true,
        position: 'top-end',
        customClass: 'swal2angular',
        showConfirmButton: false,
        timer: 9000
      });
    }

    this.registrarNovedad = new FormGroup({
      'title'         : new FormControl(this.form.title, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      'descripcion'   : new FormControl(this.form.descripcion, [
        Validators.required,
        Validators.maxLength(150)
      ]),
      'detalle'       : new FormControl(this.form.descripcion),
      'tipoNovedad'   : new FormControl(this.form.tipoNovedad),
      'urlImagen'     : new FormControl(this.form.urlImagen),
      'url'           : new FormControl(this.form.url),
      'importancia'   : new FormControl(this.form.importancia)
    });

  }

  get title(): AbstractControl {
    return this.registrarNovedad.get('title');
  }

  get descripcion(): AbstractControl {
    return this.registrarNovedad.get('descripcion');
  }

  getErrorMessageTitle(): string {
    return this.title.hasError('required') ? 'Campo requerido' : 
      this.title.hasError('maxlength') ? 'Maximo 50 caracteres' : 
        '';
  }

  getErrorMessageDescripcion(): string {
    return this.descripcion.hasError('required') ? 'Campo requerido' :
      this.descripcion.hasError('maxlength') ? 'Maximo 150 caracteres' : 
        '';
  }

  validarImportancia(): void {
    this.form.importancia = this.checked ? 1 : 0;
  }

  getFecha(): string {
    const fecha = new Date();

    const y = fecha.getFullYear();
    const m = fecha.getMonth() + 1; 
    const d = fecha.getDate();
    const h = fecha.getHours();
    const min = fecha.getMinutes() < 10  ? '0' + fecha.getMinutes() : fecha.getMinutes() ;
    const time = h > 12 ? 'p.m' : h === 12 ? 'm' : 'a.m' ;

    return `${d < 10 ? ('0' + d) : d }/${m < 10 ? ('0' + m) : m }/${y} a las ${h}:${min} ${time}`;
  }

  changeColor(): void {
    this.colorClass = this.form.color;
  }

  openDemoModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '600px';
    dialogConfig.data = this.form;

    this.dialog.open(DemoDialogDetallesComponent, dialogConfig);
  }

  onSubmit(): any {
    const tipoNovedad = this.form.tipoNovedad;

    if (tipoNovedad === 1) {

      this.form.urlImagen = null;
      this.form.detalles = null;

      this.jarwis.postNovedad(this.form).subscribe(
        data  => this.handleResponse(data),
        error => this.handleError(error)
      );
    } else if (tipoNovedad === 2) {

      this.form.color = null;
      this.form.url = null;
      this.jarwis.postNovedad(this.form).subscribe(
        data  => this.handleResponse(data),
        error => this.handleError(error)
      );
    } else if (tipoNovedad === 3) {

      this.form.url = null;
      this.form.detalles = null;
      this.form.color = null;
      this.jarwis.postNovedad(this.form).subscribe(
        data  => this.handleResponse(data),
        error => this.handleError(error)
      );
    }
  }

  handleResponse(data): any {
    swal({
      title: 'Se ha publicado tu novedad',
      type: 'success'
    });
    this.form.title = null;
    this.form.descripcion = null;
    this.form.tipoNovedad = null;
    this.form.detalles = null;
    this.form.url = null;
    this.form.urlImagen = null;
    this.form.importancia = false; 
    this.form.color = '';
  }

  handleError(error): any {
    swal('Error', error);
  }

}
