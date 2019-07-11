import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { fuseAnimations } from '@fuse/animations';
import { JarwisService } from 'app/services/jarwis.service';
import { AuthService } from 'app/services/auth.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-editar-usuario',
  templateUrl: './dialog-editar-usuario.component.html',
  styleUrls: ['./dialog-editar-usuario.component.scss'],
  animations: [fuseAnimations]
})
export class DialogEditarUsuarioComponent implements OnInit {

  editUsuario: FormGroup;

  roles = [];

  public form = {
    documento: null,
    email: null,
    nombre: null,
    apellido: null,
    rol: null
  };

  documento: any;
  name: any;
  apellido: any;
  email: any;
  rol: any;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data,
    private jarwis: JarwisService,
    private _auth: AuthService
  ) {
    this.asignarValores(data);
  }

  ngOnInit(): void {
    this.getRoles();

    this.editUsuario = new FormGroup({
      'document': new FormControl(this.form.documento, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[0-9]*')
      ]),

      'nombre': new FormControl(this.form.nombre, [
        Validators.required
      ]),

      'apellido': new FormControl(this.form.apellido, [
        Validators.required
      ]),

      'email': new FormControl(this.form.email, [
        Validators.required,
        Validators.email
      ]),

      'rol': new FormControl(this.form.rol, [
        Validators.required
      ])
    });
  }

  get documentoUser(): any {
    return this.editUsuario.get('document');
  }

  get nombreUser(): any {
    return this.editUsuario.get('nombre');
  }

  get apellidoUser(): any {
    return this.editUsuario.get('apellido');
  }

  get emailUser(): any {
    return this.editUsuario.get('email');
  }

  get rolUsuario(): any {
    return this.editUsuario.get('rol');
  }

  getErrorMessageDocument(): any {
    return this.editUsuario.get('document').hasError('required') ? 'Campo requerido' :
      this.editUsuario.get('document').hasError('minlength') ? 'Debe ingresar minimo 8 caracteres' :
        this.editUsuario.get('document').hasError('pattern') ? 'Solo se permiten números' :
          '';
  }

  getErrorMessageNombre(): any {
    return this.editUsuario.get('nombre').hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageApellido(): any {
    return this.editUsuario.get('apellido').hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageEmail(): any {
    return this.editUsuario.get('email').hasError('required') ? 'Campo requerido' :
      this.editUsuario.get('email').hasError('email') ? 'Correo electronico no valido' :
        '';
  }

  getErrorMessageRol(): any {
    return this.editUsuario.get('rol').hasError('required') ? 'Seleccione una opción' :
      '';
  }

  asignarValores(data): void {
    this.documento = data.document;
    this.form.documento = this.documento;

    this.name = data.name;
    this.form.nombre = this.name;

    this.apellido = data.lastname;
    this.form.apellido = this.apellido;

    this.email = data.email;
    this.form.email = this.email;

    this.rol = data.rol;
    this.form.rol = this.rol;
  }

  restaurar(): void {
    this.form.documento = this.documento;
    this.form.nombre = this.name;
    this.form.apellido = this.apellido;
    this.form.email = this.email;
    this.form.rol = this.rol;
  }

  closeModal(): void {
    this._dialogRef.close();

  }

  onSubmit(): any {
    this.jarwis.editUsers(this.form, this.form.documento).subscribe(
      dato => dato < 1 ? this.handleError() : this.handleResponse(),
      error => { this.handleError(); console.log(error); }
    );
    // const id = this._auth.getDocument();
    // let flag = null;

    // swal({
    //   title: 'Ingrese su contraseña',
    //   html: '<small>Solo el administrador tiene permiso para esta acción</small>',
    //   input: 'password',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Aceptar',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (password) => {
    //     const data = {
    //       id: id,
    //       password: password
    //     };

    //     this.jarwis.validatePassword(data)
    //       .subscribe(
    //         response => {
    //           if (response) {
    //             flag = true;
    //           } else {
    //             flag = false;
    //           }
    //         }
    //       );

    //     if (!flag) {
    //       swal.showValidationError('Contraseña incorrecta');
    //     } else if (flag === null) {
    //       swal.showLoading();
    //     }
    //   }
    // }).then((response) => {
    //   if (!flag) {
    //     swal.showValidationError('Contraseña incorrecta');
    //   } else if (flag === null) {
    //     swal.showLoading();
    //   }
    // });
  }

  handleResponse(): any {
    swal({
      type: 'success',
      title: `Se ha modificado a ${this.form.nombre} ${this.form.apellido}`
    });

    this._dialogRef.close();
  }

  handleError(): any {
    swal({
      type: 'warning',
      title: 'No se realizaron cambios al usuario'
    });
    this._dialogRef.close();
  }

  getRoles(): void {
    this.jarwis.getRoles().subscribe(
      data => this.roles = data
    );
  }

}
