import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import swal from 'sweetalert2';
import { JarwisService } from 'app/services/jarwis.service';
import { TokenService } from 'app/services/token.service';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector   : 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls  : ['./login-2.component.scss'],
    animations : fuseAnimations
})
export class Login2Component implements OnInit
{
    loginForm: FormGroup;
    public hide;

    public form = {
        document: null,
        password: null
    };

    public error = null;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private router: Router,
        private jarwis: JarwisService,
        private token: TokenService,
        private auth: AuthService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    onSubmit(): any {
        this.jarwis.login(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.handleError(error)
        );
    }

    handleResponse(data): any {
        this.token.handle(data.access_token);
        this.auth.setRol(data.rol);
        this.auth.setNameUser(data.user);
        this.auth.setLastName(data.lastname);
        this.auth.setDocument(data.document);
        this.auth.changeAuthStatus(true);
        this.router.navigate(['/home']);
    }

    handleError(error): void {
        console.error(error); 
        swal({
            title       : 'Error', 
            titleText   : error.error.error,
            type        : 'warning'
        });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
        if (this.token.isValid()) {
            this.router.navigate(['/home']);
        }

        this.loginForm = new FormGroup({
            'document' : new FormControl('', [
                Validators.required,
                Validators.pattern('[0-9]*'),
                Validators.minLength(8)
            ]),
            'password' : new FormControl('', [
                Validators.required,
                Validators.minLength(8)
            ])
        });
    }

    get document(): AbstractControl {
        return this.loginForm.get('document');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }

    getErrorMessageDocument(): string {
        return this.document.hasError('required') ? 'Ingrese su documento' : 
            this.document.hasError('pattern') ? 'Solo se permiten caracteres númericos' :  
                this.document.hasError('minlength') ? 'Debe ingresar minimo 8 caracteres' : 
                    '';
    }

    getErrorMessagePassword(): string {
        return this.password.hasError('required') ? 'Ingrese su contraseña' :
            this.password.hasError('minlength') ? 'Debe ingresar minimo 8 caracteres' :
                '';
    }

}
