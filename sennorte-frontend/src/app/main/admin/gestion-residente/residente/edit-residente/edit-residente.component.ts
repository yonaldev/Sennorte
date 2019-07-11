import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'app/services/jarwis.service';
import swal from 'sweetalert2';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-edit-residente',
  templateUrl: './edit-residente.component.html',
  styleUrls: ['./edit-residente.component.scss'],
  animations: fuseAnimations
})
export class EditResidenteComponent implements OnInit {

  registroResidenteForm: FormGroup;

  name = '';
  doc = '';
  informacion = {
    id_residente: null,
    nombre1_residente: null,
    nombre2_residente: null,
    apellido_residente: null
  };
  origen: 'profile' | 'main';

  estado_civil = [];
  acudiente = [];
  // cama = [];
  eps = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _jarwis: JarwisService,
    private _router: Router
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.origen = params['origen'];

      if (this.origen !== 'main' && this.origen !== 'profile') {
        swal({
          type: 'warning',
          titleText: 'La URL es invalida',
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });
        this._router.navigate(['/residente']);
      } else {
        this.doc = params['id'];
        this._jarwis.informacionResidente(params['id'])
          .subscribe(
            data => {
              if (data[0].estado === 1) {
                this.informacion = data[0];
                this.name = `${this.informacion.nombre1_residente} ${this.informacion.nombre2_residente ? this.informacion.nombre2_residente : ''} 
                ${this.informacion.apellido_residente}`;
                // this.listarCama();
                this.listarEps();
                this.listarEstadoCivil();
                this.listarAcudientes();

              } else if (data[0].estado === 0) {
                swal({
                  type: 'warning',
                  title: 'Error',
                  html: 'El residente seleccionado tiene un estado inactivo',
                  timer: 4000
                });
                this._router.navigate(['/residente']);
              }
            }
          );

      }
    });
 
  }

  ngOnInit(): void {

    this.registroResidenteForm = new FormGroup({
      'nombre1_residente': new FormControl('', [
        Validators.required
      ]),
      'nombre2_residente': new FormControl(''),
      'apellido_residente': new FormControl('', [
        Validators.required
      ]),
      'fecha_nacimiento_residente': new FormControl('', [
        Validators.required,
        this.ageRangeValidator
      ]),
      'sexo': new FormControl('', [
        Validators.required
      ]),

      'peso': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'parentesco': new FormControl('', [
        Validators.required
      ]),
      'eps_id_eps': new FormControl('', [
        Validators.required
      ]),
      'id_estado_civil': new FormControl('', [
        Validators.required
      // ]),
      // 'id_cama': new FormControl('', [
      //   Validators.required
      ]),
      'id_acudiente': new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit(): void {
    this._jarwis.editarResidente(this.informacion, this.doc)
      .subscribe(
        data => {
          if (data > 0) {
            swal({
              type: 'success',
              title: 'Se han realizado cambios satisfactoriamente',
              timer: 5000
            });
          } else if (data === 0) {
            swal({
              type: 'warning',
              title: 'No se realizaron cambios',
              titleText: 'Es posible que no haya cambiado ningún campo',
              timer: 5000
            });
          }

          if (this.origen === 'main') {
            this._router.navigate(['/residente']);
          } else if (this.origen === 'profile') {
            this._router.navigate(['/residente', 'perfil', this.doc]);
          }
        }
      );
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

  get documentoResidente(): any {
    return this.registroResidenteForm.get('id_residente');
  }

  get nacimientoResidente(): any {
    return this.registroResidenteForm.get('fecha_nacimiento_residente');
  }

  get pesoResidente(): any {
    return this.registroResidenteForm.get('peso');
  }

  getErrorMessageDocumentoResidente(): any {
    return this.documentoResidente.hasError('required') ? 'Campo requerido' :
      this.documentoResidente.hasError('minlength') ? 'Mínimo 8 carácteres' :
        this.documentoResidente.hasError('pattern') ? 'Solo caracteres númericos' :
          '';
  }

  getErrorMessageNacimientoResidente(): any {
    return this.nacimientoResidente.hasError('required') ? 'Campo requerido' :
      !this.nacimientoResidente.hasError('ageValidate') ? 'Edad debe ser mayor a 45 años' :
        this.nacimientoResidente.status = 'VALID';
  }

  getErrorMessagePeso(): any {
    return this.pesoResidente.hasError('required') ? 'Campo requerido' :
      this.pesoResidente.hasError('pattern') ? 'Solo se permiten caracteres númericos' :
        '';
  }

  listarEstadoCivil(): void {
    this._jarwis.getEstadoCivil().subscribe(
      data => this.estado_civil = data
    );
  }


  listarAcudientes(): void {

    this._jarwis.getAcudientes().subscribe(
      data => this.acudiente = data.filter(items => items.estado === 1)
    );

  }

  // listarCama(): void {
  //   this._jarwis.getCama().subscribe(
  //     data => this.cama = data
  //   );
  // }

  listarEps(): void {
    this._jarwis.getEps().subscribe(
      data => this.eps = data
    );
  }

}
