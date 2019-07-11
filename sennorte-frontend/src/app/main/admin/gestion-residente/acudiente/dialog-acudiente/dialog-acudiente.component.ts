import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';

import { JarwisService } from 'app/services/jarwis.service';
import { formatDate } from '@angular/common';
import swal from 'sweetalert2';
import { AuthService } from '../../../../../services/auth.service';


@Component({
  selector: 'dialog-acudiente',
  templateUrl: './dialog-acudiente.component.html',
  styleUrls: ['./dialog-acudiente.component.scss'],
  animations: [ fuseAnimations ]
})
export class DialogAcudienteComponent implements OnInit {

editarAcudiente: FormGroup;

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
 
 documento: any;
 nombre: any;
 direccion: any;
 primerTelefono: any;
 segundoTelefono: any;
 fecha_nacimiento: any;
 id_estado_civil: any;

 rol: string;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private jarwis: JarwisService,
    private dialogRef: MatDialogRef<any>,
    @Inject(LOCALE_ID) private locale: string,
    private auth: AuthService
  ) {
    this.rol = this.auth.getRol();
    
    this.documento = data.id_acudiente;
    this.form.id_acudiente = this.documento;

    this.nombre  = data.nombre_acudiente;
    this.form.nombre_acudiente = this.nombre;

    this.direccion = data.direccion_acudiente;
    this.form.direccion_acudiente = this.direccion;

    this.primerTelefono = data.telefono_1;
    this.form.telefono_1 = this.primerTelefono;

    this.segundoTelefono = data.telefono_2;
    this.form.telefono_2 = this.segundoTelefono;

    this.fecha_nacimiento = data.fecha_nacimiento_acudiente;
    this.form.fecha_nacimiento_acudiente = this.fecha_nacimiento;

    this.id_estado_civil = data.id_estado_civil;
    this.form.id_estado_civil = this.id_estado_civil;

   }

  ngOnInit(): void{
 
    this.listarEstadoCivil();

     this.editarAcudiente = new FormGroup ({
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
          Validators.required
        ]),
        'segundoTelefono' : new FormControl ('', [
          Validators.required
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
    return this.editarAcudiente.get('documento');
  }

  get nacimientoAcudiente(): any {
    return this.editarAcudiente.get('fecha_nacimiento');
  }

  getErrorMessageDocumentoAcudiente(): any {
    return this.documentoAcudiente.hasError('required') ? 'Campo requerido' :
      this.documentoAcudiente.hasError('minlength') ? 'Mínimo 8 carácteres' :
        this.documentoAcudiente.hasError('pattern') ? 'Solo caracteres númericos' :
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

  listarEstadoCivil(): void {
    this.jarwis.getEstadoCivil().subscribe(
      data => this.estado_civil = data
    );
  }

  transformDate(date): any {
    const dateResult = formatDate(date, 'yyyy-MM-dd', this.locale);
    dateResult.substring(0, 9);
    return dateResult;
  }

  restaurar(): void {
     this.form.id_acudiente = this.documento;
     this.form.nombre_acudiente = this.nombre;
     this.form.direccion_acudiente = this.direccion;
     this.form.telefono_1 = this.primerTelefono;
     this.form.telefono_2 = this.segundoTelefono;
     this.form.fecha_nacimiento_acudiente = this.fecha_nacimiento;
     this.form.id_estado_civil = this.id_estado_civil;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onSubmit(): any {
    this.form.fecha_nacimiento_acudiente = this.transformDate(this.form.fecha_nacimiento_acudiente);

    this.jarwis.editarAcudiente(this.form, this.form.id_acudiente).subscribe(
      data => this.handleResponse() ,
      error => { this.handleError(); }
    );
  }

  handleResponse(): any {
    swal({
      type: 'success',
      title: `Se ha modificado a ${this.form.nombre_acudiente}`
    });

    this.dialogRef.close();
  }

  handleError(): any {
    swal({
      type: 'error',
      title: 'Error'
    });
  }

}
