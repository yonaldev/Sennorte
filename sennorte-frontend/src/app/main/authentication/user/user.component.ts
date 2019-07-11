import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { JarwisService } from 'app/services/jarwis.service';
import { AuthService } from 'app/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { confirmPasswordValidator } from '../reset-password-2/reset-password-2.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fuseAnimations]
})
export class UserComponent implements OnInit {

  formPass: FormGroup;

  cambiada = false;
  error = false;
  messagePassword = 'No se han hecho cambios';

  constructor(
    private _jarwis: JarwisService,
    private _auth: AuthService
  ) { 
    this._jarwis.getUserInfo(this._auth.getDocument())
        .subscribe(
          data => {
            this.informacion = data[0];
          }
        );
  }

  password = {
    tipoActualizacion: 1,
    document: this._auth.getDocument(),
    actual: null,
    nueva: null
  };

  informacion = {
    tipoActualizacion: 2,
    document: this._auth.getDocument()
  };

  ngOnInit(): void {
    this.formPass = new FormGroup({
      'actual' : new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      'password' : new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      'passwordConfirm' : new FormControl('', [
        Validators.required,
        confirmPasswordValidator
      ])
    });
  }

  changePassword(): void {
    this._jarwis.updateProfile(this.password)
        .subscribe(
          data => {
            this.handleResponsePass(data);
          },
          error => {
            this.handleErrorPass(error);
          }
        );
  }

  handleResponsePass(data): void {
    this.messagePassword = data;
    
    this.formPass.reset();

    this.cambiada = true;
    this.error = false;
  }

  handleErrorPass(error): void {
    this.messagePassword = error.error;

    this.cambiada = false;
    this.error = true;
  }



}
