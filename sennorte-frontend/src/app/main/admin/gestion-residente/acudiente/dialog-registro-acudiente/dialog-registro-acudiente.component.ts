import { Component, OnInit, LOCALE_ID, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { formatDate } from '@angular/common';

import { MatDialog, MatDialogRef, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatAccordion } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


import { JarwisService } from '../../../../../services/jarwis.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-registro-acudiente',
  templateUrl: './dialog-registro-acudiente.component.html',
  styleUrls: ['./dialog-registro-acudiente.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class DialogRegistroAcudienteComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;


  RegistrarAcudiente: FormGroup;


  estado_civil = [];
  public form  = { 
    id_acudiente: null,
    nombre_acudiente: null,
    direccion_acudiente: null,
    telefono_1: null,
    telefono_2: null,
    fecha_nacimiento_acudiente: null,
    id_estado_civil: null,
   };

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private jarwis: JarwisService,
    private dialog: MatDialogRef<DialogRegistroAcudienteComponent>,
    private router: Router,
    private _adapter: DateAdapter<any>
    ) { }

  ngOnInit(): void {

    this._adapter.setLocale('es');

    this.listarEstadoCivil();

    this.RegistrarAcudiente = new FormGroup ({
      'documento' : new FormControl ('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[0-9]*')
      ]),
      'nombre'    : new FormControl ('', [
        Validators.required
      ]),
      'direccion' : new FormControl ('', [
        Validators.required
      ]),
      'primerTelefono' : new FormControl ('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'segundoTelefono' : new FormControl ('', [
        Validators.pattern('[0-9]*')
      ]),
      'fecha_nacimiento' : new FormControl ('', [
        Validators.required,
        this.RangeValidator
      ]),
      'estado_civil'    : new FormControl('', [
        Validators.required
      ]),
   });  

  }

  get documentoAcudiente(): any {
    return this.RegistrarAcudiente.get('documento');
  }

  get telefono1(): any {
    return this.RegistrarAcudiente.get('primerTelefono');
  }

  get telefono2(): any {
    return this.RegistrarAcudiente.get('segundoTelefono');
  }

  get nacimientoAcudiente(): any {
    return this.RegistrarAcudiente.get('fecha_nacimiento');
  }

  getErrorMessageDocumentoAcudiente(): any {
    return this.documentoAcudiente.hasError('required') ? 'Campo requerido' :
      this.documentoAcudiente.hasError('minlength') ? 'Mínimo 8 carácteres' :
        this.documentoAcudiente.hasError('pattern') ? 'Solo caracteres númericos' :
          '';
  }

  getErrorMessagePrimerTelefono(): any {
    return this.telefono1.hasError('required') ? 'Campo requerido' : 
      this.telefono1.hasError('pattern') ? 'Solo caracteres númericos' : 
        '';
  }

  getErrorMessageSegundoTelefono(): any {
    return this.telefono2.hasError('pattern') ? 'Solo caracteres númericos' : 
      '';
  }

  getErrorMessageNacimientoAcudiente(): any {
    return this.nacimientoAcudiente.hasError('required') ? 'Campo requerido' : 
      !this.nacimientoAcudiente.hasError('Validate') ? 'Edad debe ser mayor a 18 años' : 
        this.nacimientoAcudiente.status = 'VALID';
  }

  RangeValidator(control: AbstractControl): any {
    const year = control.value;
    if (year && year._i) {
      const actualYear = new Date().getFullYear();
      const comparate = actualYear - year._i.year;

      if (comparate >= 18) {
        return { Validate: true };
      } else {
        return { Validate: false};
      }
      
    }
    return null;
  }

  transformDate(date): any {
    const dateResult = formatDate(date, 'yyyy-MM-dd', this.locale);
    dateResult.substring(0, 9);
    return dateResult;
  }

  listarEstadoCivil(): void {
    this.jarwis.getEstadoCivil().subscribe(
      data => this.estado_civil = data
    );
  }
 
  onSubmit(): any {
  this.form.fecha_nacimiento_acudiente = this.transformDate(this.form.fecha_nacimiento_acudiente);

    this.jarwis.postAcudiente(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error),
    );
  }

  handleResponse(data): any {
    swal({
      type: 'success',
      title: `Se ha registrado`
    });

    this.dialog.close();
  }

  handleError(error): any {
    swal({
      type: 'error',
      title: 'Error'
    });
  }

  public close(): void {
    this.dialog.close();
  }
}
