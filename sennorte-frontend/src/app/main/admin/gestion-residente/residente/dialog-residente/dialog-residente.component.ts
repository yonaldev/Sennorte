import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';

import { MatDialogRef, MatAccordion } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

import swal from 'sweetalert2';

import { JarwisService } from 'app/services/jarwis.service';
import { TokenService } from 'app/services/token.service';
import { formatDate } from '@angular/common';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-dialog-residente',
  templateUrl: './dialog-residente.component.html',
  styleUrls: ['./dialog-residente.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  animations: fuseAnimations
})

export class DialogResidenteComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  rol: any;

  registroResidenteFormSelect: FormGroup;
  registroResidenteForm: FormGroup;

  flagAcudiente = false;

  estado_civil = [];
  acudiente = [];
  habitacion = [];
  cama = [];
  eps = [];


  public formResidente = {
    id_residente: null,
    nombre1_residente: null,
    nombre2_residente: null,
    apellido_residente: null,
    fecha_nacimiento_residente: null,
    sexo: null,
    peso: null,
    parentesco: null,
    id_acudiente: null,
    eps_id_eps: null,
    id_estado_civil: null,
    id_cama: null,

  };

  public formAcudiente = {
    id_acudiente: null,
    nombre_acudiente: null,
    direccion_acudiente: null,
    telefono_1: null,
    telefono_2: null,
    fecha_nacimiento_acudiente: null,
    id_estado_civil: null,
  };

  public id_acudiente2 = {
    id_acudiente2: null
  };

  constructor(
    private _matDialogRef: MatDialogRef<DialogResidenteComponent>,
    private _adapter: DateAdapter<any>,
    private jarwis: JarwisService,
    @Inject(LOCALE_ID) private locale: string,
  ) { }

  ngOnInit(): void {
    this._adapter.setLocale('es');

    this.listarEstadoCivil();
    this.listarAcudientes();
    // this.listarCama();
    this.listarEps();

    this.registroResidenteFormSelect = new FormGroup({
      'id_residente': new FormControl(this.formResidente.id_residente, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[0-9]*')
      ]),
      'nombre1_residente': new FormControl(this.formResidente.nombre1_residente, [
        Validators.required
      ]),
      'nombre2_residente': new FormControl(this.formResidente.nombre2_residente),
      'apellido_residente': new FormControl(this.formResidente.apellido_residente, [
        Validators.required
      ]),
      'fecha_nacimiento_residente': new FormControl(this.formResidente.fecha_nacimiento_residente, [
        Validators.required,
        this.ageRangeValidator
      ]),
      'sexo': new FormControl(this.formResidente.sexo, [
        Validators.required
      ]),

      'peso': new FormControl(this.formResidente.peso, [
        Validators.required
      ]),
      'parentesco': new FormControl(this.formResidente.parentesco, [
        Validators.required
      ]),
      'eps_id_eps': new FormControl(this.formResidente.eps_id_eps, [
        Validators.required
      ]),
      'id_estado_civil': new FormControl(this.formResidente.id_estado_civil, [
        Validators.required
      ]),
      // 'id_cama': new FormControl(this.formResidente.id_cama, [
      //   Validators.required
      // ]),
      'id_acudiente': new FormControl(this.formAcudiente.id_acudiente, [
        Validators.required
      ])
    });

    this.registroResidenteForm = new FormGroup({
      'id_residente': new FormControl(this.formResidente.id_residente, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[0-9]*')
      ]),
      'nombre1_residente': new FormControl(this.formResidente.nombre1_residente, [
        Validators.required
      ]),
      'nombre2_residente': new FormControl(this.formResidente.nombre2_residente),
      'apellido_residente': new FormControl(this.formResidente.apellido_residente, [
        Validators.required
      ]),
      'fecha_nacimiento_residente': new FormControl(this.formResidente.fecha_nacimiento_residente, [
        Validators.required,
        this.ageRangeValidator
      ]),
      'sexo': new FormControl(this.formResidente.sexo, [
        Validators.required
      ]),

      'peso': new FormControl(this.formResidente.peso, [
        Validators.required
      ]),
      'parentesco': new FormControl(this.formResidente.parentesco, [
        Validators.required
      ]),
      'eps_id_eps': new FormControl(this.formResidente.eps_id_eps, [
        Validators.required
      ]),
      'id_estado_civil': new FormControl(this.formResidente.id_estado_civil, [
        Validators.required
      ]),
      // 'id_cama': new FormControl(this.formResidente.id_cama, [
      //   Validators.required
      // ]),
      'id_acudiente': new FormControl(this.formAcudiente.id_acudiente, [
        Validators.required,
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[0-9]*')
      ]),

      // **********formulario acudiente

      'nombre_acudiente': new FormControl(this.formAcudiente.nombre_acudiente, [
        Validators.required
      ]),
      'fecha_nacimiento_acudiente': new FormControl(this.formAcudiente.fecha_nacimiento_acudiente, [
        Validators.required,
        this.RangeValidator
      ]),
      'direccion_acudiente': new FormControl(this.formAcudiente.direccion_acudiente, [
        Validators.required
      ]),
      'telefono_1': new FormControl(this.formAcudiente.telefono_1, [
        Validators.required,
        Validators.pattern('[0-9]*')]),
      'telefono_2': new FormControl(this.formAcudiente.telefono_2, Validators.pattern('[0-9]*')),

      'id_estado_civil_acudiente': new FormControl(this.formAcudiente.id_estado_civil, [
        Validators.required
      ])
    });

  }

  get documentoResidente(): any {
    return !this.flagAcudiente ? this.registroResidenteForm.get('id_residente') :
      this.registroResidenteFormSelect.get('id_residente');
  }

  get nacimientoResidente(): any {
    return !this.flagAcudiente ? this.registroResidenteForm.get('fecha_nacimiento_residente') :
      this.registroResidenteFormSelect.get('fecha_nacimiento_residente');
  }

  get documentoAcudiente(): any {
    return !this.flagAcudiente ? this.registroResidenteForm.get('id_acudiente') :
      this.registroResidenteFormSelect.get('id_acudiente');
  }

  get nacimientoAcudiente(): any {
    return !this.flagAcudiente ? this.registroResidenteForm.get('fecha_nacimiento_acudiente') :
      this.registroResidenteFormSelect.get('fecha_nacimiento_acudiente');
  }

  get telefono1(): any {
    return !this.flagAcudiente ? this.registroResidenteForm.get('telefono_1') :
      this.registroResidenteFormSelect.get('telefono_1');
  }

  get telefono2(): any {
    return !this.flagAcudiente ? this.registroResidenteForm.get('telefono_2') :
      this.registroResidenteFormSelect.get('telefono_2');
  }


  getErrorMessageDocumentoResidente(): any {
    return this.documentoResidente.hasError('required') ? 'Campo requerido' :
      this.documentoResidente.hasError('minlength') ? 'Mínimo 6 carácteres' :
        this.documentoResidente.hasError('pattern') ? 'Solo caracteres númericos' :
          '';
  }

  getErrorMessageNacimientoResidente(): any {
    return this.nacimientoResidente.hasError('required') ? 'Campo requerido' :
      !this.nacimientoResidente.hasError('ageValidate') ? 'Edad debe ser mayor a 45 años' :
        this.nacimientoResidente.status = 'VALID';
  }

  getErrorMessageDocumentoAcudiente(): any {
    return this.documentoAcudiente.hasError('required') ? 'Campo requerido' :
      this.documentoAcudiente.hasError('minlength') ? 'Mínimo 6 carácteres' :
        this.documentoAcudiente.hasError('pattern') ? 'Solo caracteres númericos' :
          '';
  }

  getErrorMessageNacimientoAcudiente(): any {
    return this.nacimientoAcudiente.hasError('required') ? 'Campo requerido' :
      !this.nacimientoAcudiente.hasError('Validate') ? 'Edad debe ser mayor a 18 años' :
        this.nacimientoAcudiente.status = 'VALID';
  }

  getErrorMessageTelefono1(): any {
    return this.telefono1.hasError('required') ? 'Campo requerido' :
      this.telefono1.hasError('pattern') ? 'Solo se permiten caracteres númericos' :
        '';
  }

  getErrorMessageTelefono2(): any {
    return this.telefono2.hasError('pattern') ? 'Solo se permiten caracteres númericos' :
      '';
  }

  ageRangeValidator(control: AbstractControl): any {
    const year = control.value;
    if (year && year._i) {
      const actualYear = new Date().getFullYear();
      const comparate = actualYear - year._i.year;

      if (comparate >= 45) {
        return { ageValidate: true };
      } else {
        return { ageValidate: false };
      }

    }
    return null;
  }

  RangeValidator(control: AbstractControl): any {
    const year = control.value;
    if (year && year._i) {
      const actualYear = new Date().getFullYear();
      const comparate = actualYear - year._i.year;

      if (comparate >= 18) {
        return { Validate: true };
      } else {
        return { Validate: false };
      }

    }
    return null;
  }

  listarEstadoCivil(): void {
    this.jarwis.getEstadoCivil().subscribe(
      data => this.estado_civil = data
    );
  }


  listarAcudientes(): void {

    this.jarwis.getAcudientes().subscribe(
      data => this.acudiente = data.filter(items => items.estado === 1)
    );

  }

  // listarCama(): void {
  //   this.jarwis.getCama().subscribe(
  //     data => this.cama = data
  //   );
  // }

  listarEps(): void {
    this.jarwis.getEps().subscribe(
      data => this.eps = data
    );
  }
  
  
  
  onSubmit(): any {
    // this.formResidente.id_acudiente = this.id_acudiente;
    this.formAcudiente.id_acudiente = this.id_acudiente2.id_acudiente2;
    this.formResidente.id_acudiente = this.id_acudiente2.id_acudiente2;
    
    if (this.flagAcudiente) {
      this.formResidente.fecha_nacimiento_residente = this.transformDate(this.formResidente.fecha_nacimiento_residente);
      
      this.jarwis.postResidente(this.formResidente).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error),
        
        );
      } else {
        this.formAcudiente.fecha_nacimiento_acudiente = this.transformDate(this.formAcudiente.fecha_nacimiento_acudiente);
        this.jarwis.postAcudiente(this.formAcudiente).subscribe(
          data => {
            if (data) {
              this.formResidente.fecha_nacimiento_residente = this.transformDate(this.formResidente.fecha_nacimiento_residente);
              this.jarwis.postResidente(this.formResidente).subscribe(
              response => this.handleResponse(response),
              error => this.handleError(error),

            );
          }
        },
        error => this.handleError(error),

      );

    }

  }

  transformDate(date): any {
    const dateResult = formatDate(date, 'yyyy-MM-dd', this.locale);
    dateResult.substring(0, 9);
    return dateResult;
  }

  handleResponse(data): void {
    console.log(data);

    swal({
      title: 'Hecho',
      titleText: 'Residente creado satisfactoriamente',
      type: 'success',
    });
    this._matDialogRef.close();
  }

  handleError(error): any {
    swal({
      type: 'warning',
      title: 'Error',
      html: error.error.error
    });
  }
  public close(): void {
    this._matDialogRef.close();
  }


}
