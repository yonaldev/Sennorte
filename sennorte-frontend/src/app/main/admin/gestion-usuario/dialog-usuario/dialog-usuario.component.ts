import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';

import { JarwisService } from 'app/services/jarwis.service';
import { TokenService } from 'app/services/token.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.scss']
})
export class DialogUsuarioComponent implements OnInit {

  registrarUsuario: FormGroup;

  public hide: any;

  roles = [];

  public form = {
    document: null,
    email: null,
    name: null,
    lastname: null,
    password: null,
    rol: null
  };

  public error = {
    email: null,
    document: null 
  };

  constructor(
    private _matDialogRef: MatDialogRef<DialogUsuarioComponent>,
    private jarwis: JarwisService,
    private token: TokenService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getRoles();

    this.registrarUsuario = new FormGroup({

      'documentUsuario' : new FormControl(this.form.document, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[0-9]*')
      ]),
      
      'emailUsuario'    : new FormControl(this.form.email, [
        Validators.required,
        Validators.email
      ]), 
      
      'passwordUsuario' : new FormControl(this.form.password, [
        Validators.required,
        Validators.minLength(8)
      ]),

      'nameUsuario'     : new FormControl(this.form.name, [
        Validators.required
      ]),

      'lastnameUsuario' : new FormControl(this.form.lastname, [
        Validators.required
      ]),

      'rolUsuario'             : new FormControl(this.form.rol, [
           Validators.required
      ])
      
    });
  }

  get documentUsuario(): any {
    return this.registrarUsuario.get('documentUsuario');
  }

  get nameUsuario(): any {
    return this.registrarUsuario.get('nameUsuario');
  }

  get lastnameUsuario(): any {
    return this.registrarUsuario.get('lastnameUsuario');
  }

  get emailUsuario(): any {
    return this.registrarUsuario.get('emailUsuario');
  }

  get passwordUsuario(): any {
    return this.registrarUsuario.get('passwordUsuario');
  }

  get rolUsuario(): any {
    return this.registrarUsuario.get('rolUsuario');
  }

  getErrorMessageDocument(): any {
    return this.documentUsuario.hasError('required') ? 'Campo requerido' :
      this.documentUsuario.hasError('minlength') ? 'Debe ingresar minimo 8 caracteres' : 
        this.documentUsuario.hasError('pattern') ? 'Solo se permiten caracteres numericos' :
          '';
  }

  getErrorMessageName(): any {
    return this.nameUsuario.hasError('required') ? 'Campo requerido' : 
    ''; 
  }

  getErrorMessageLastname(): any {
    return this.lastnameUsuario.hasError('required') ? 'Campo requerido' :
    '';
  }

  getErrorMessagePassword(): any {
    return this.passwordUsuario.hasError('required') ? 'Campo requerido' :
      this.passwordUsuario.hasError('minlength') ? 'Debe ingresar minimo 8 caracteres' : 
        '';
  }

  getErrorMessageEmail(): any {
    return this.emailUsuario.hasError('required') ? 'Campo requerido' :
      this.emailUsuario.hasError('email') ? 'Ingrese un email valido' : 
        '';
  }

  getErrorMessageRol(): any {
    return this.rolUsuario.hasError('required') ? 'Campo requerido' : 
      '';
  }

  // Envio de datos hacia laravel
  onSubmit(): any {
    this.jarwis.signup(this.form).subscribe(
      data  => this.handleResponse(data),
      error => this.handleError(error)
    );

  }

  // Funcion si el usuario es creado
  handleResponse(data): void {
    console.log(data);
    this.token.handle(data.access_token);
    swal({
      title       : 'Hecho', 
      titleText   : 'Usuario creado satisfactoriamente',
      type        : 'success',
    });
    this._matDialogRef.close();
  }

  // Funcion si se envian errores
  handleError(error): void {
    this.error = error.error.errors;
    console.log(this.error);
    if (this.error.email !== undefined) {
      swal('Error', this.error.email[0], 'warning');
    } else if (this.error.document !== undefined) {
      swal('Error', this.error.document[0], 'warning');
    }
  }

  // Listar roles de usuario
  getRoles(): void {
    this.jarwis.getRoles().subscribe(
      data => this.roles = data
    );
  }

  public close(): void {
    this._matDialogRef.close();
  }

}
