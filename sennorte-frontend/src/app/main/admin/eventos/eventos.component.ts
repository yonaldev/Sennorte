import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import swal from 'sweetalert2';
import { JarwisService } from 'app/services/jarwis.service';
import { formatDate } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EventoDialogComponent } from './evento-dialog/evento-dialog.component';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  animations: fuseAnimations
})
export class EventosComponent implements OnInit {

  eventoForm: FormGroup;

  evento = {
    title: null,
    descripcion: null,
    fecha: null,
    hora: null,
    minuto: null,
    horario: null,
    imagen: null
  };


  fechaActual = new Date();

  constructor(
    private _jarwis: JarwisService,
    private _auth: AuthService,
    private _token: TokenService,
    private _router: Router,
    private _dialog: MatDialog,
    @Inject(LOCALE_ID) private locale: string
  ) {

    if (!this._token.isValid()) {
      this._router.navigate(['/']);
    } 

    if (this._auth.getRol() !== '5' && this._auth.getRol() !== '1') {
      this._router.navigate(['/home']);
      swal({
        type: 'warning',
        titleText: 'No tienes acceso a este sitio',
        toast: true,
        position: 'bottom-right'
      });
    }

    this.eventoForm = new FormGroup({
      'title': new FormControl('', [
         Validators.maxLength(50),
         Validators.required
      ]),
      'descripcion': new FormControl('', [
        Validators.maxLength(150),
        Validators.required
      ]),
      'fecha' : new FormControl('', [
        Validators.required
      ]),
      'hora' : new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.required,
        this.rangeHour
      ]),
      'minuto' : new FormControl('', [
        Validators.pattern('[0-9]*'),
        Validators.required
      ]),
      'horario' : new FormControl('', [
        Validators.required
      ]),
      'imagen' : new FormControl('', [
        Validators.required
      ])
    });
  }

  openModal(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    this._dialog.open(EventoDialogComponent, dialogConfig);
  }

  onSubmit(): void {

    this.evento.fecha = this.transformDate(this.evento.fecha);

    this._jarwis.postEvento(this.evento)
        .subscribe(
          data => {
           this.handle(true);
          },
          error => {
            this.handle(false);
          }
        );
  }

  handle(tipo: boolean): void {
    swal({
      type: tipo ? 'success' : 'error',
      titleText: tipo ? 'Se ha publicado el evento' : 'Error al publicar el evento',
      confirmButtonText: 'Ok'
    });

    if (tipo) {
      this.evento = {
        title: null,
        descripcion: null,
        fecha: null,
        hora: null,
        minuto: null,
        horario: null,
        imagen: null
      };
      this.eventoForm.reset();
     
    } 
  }

  ngOnInit(): void {
  }

  get title(): AbstractControl {
    return this.eventoForm.get('title');
  }

  get descripcion(): AbstractControl {
    return this.eventoForm.get('descripcion');
  }

  get fecha(): AbstractControl {
    return this.eventoForm.get('fecha');
  }

  get hora(): AbstractControl {
    return this.eventoForm.get('hora');
  }
  
  get minuto(): AbstractControl {
    return this.eventoForm.get('minuto');
  }

  get horario(): AbstractControl {
    return this.eventoForm.get('horario');
  }

  get imagen(): AbstractControl {
    return this.eventoForm.get('imagen');
  }

  getErrorMessageTitle(): string {
    return this.title.hasError('maxlength') ? 'Máximo 50 caracteres' : 
      this.title.hasError('required') ? 'Campo requerido' : 
        '';
  }

  getErrorMessageDescripcion(): string {
    return this.descripcion.hasError('maxlength') ? 'Máximo 200 caracteres' : 
      this.descripcion.hasError('required') ? 'Campo requerido' : 
        '';
  }

  getErrorMessageFecha(): string {
    return this.fecha.hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageHora(): any {
    return this.hora.hasError('required') ? 'Campo requerido' : 
      this.hora.hasError('pattern') ? 'Sólo caracteres númericos' :
        this.hora.hasError('hourValidate') ? 'El número ingresado esta fuera del rango de 1 a 12' : 
          '';
  }

  getErrorMessageMinuto(): any {
    return this.minuto.hasError('required') ? 'Campo requerido' : 
      this.minuto.hasError('pattern') ? 'Sólo caracteres númericos' :
        this.minuto.hasError('minuteValidate') ? 'El número ingresado esta fuera del rango de 1 a 59' : 
          '';
  }

  rangeHour(control: AbstractControl): any {
    const hour = control.value;

    if (hour) {

      if ( hour < 13 ) {
        return null;
      } else if ( hour < 0) {
        return null;
      } else {
        return { hourValidate: true };
      }

    }

    return null;
  }

  rangeMinute(control: AbstractControl): any {
    const hour = control.value;

    if (hour) {

      if ( hour < 13 ) {
        return null;
      } else if ( hour < 0) {
        return null;
      } else {
        return { minuteValidate: true };
      }

    }

    return null;
  }

  ayuda(ubicacion: string): void {
    let mensaje;

    if (ubicacion === 'hora') {
      mensaje = 'Ingrese un número dentro del rango de 1 a 12';
    } else if (ubicacion === 'minuto') {
      mensaje = 'Ingrese un número dentro del rango de 1 a 59';
    }

    swal({
      type: 'info',
      titleText: mensaje,
      confirmButtonText: 'Entiendo'
    });

  }

  transformDate(date): any {
    const dateResult = formatDate(date, 'yyyy-MM-dd', this.locale);
    dateResult.substring(0, 9);
    return dateResult;
    
  }

}

