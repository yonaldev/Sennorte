import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, EmailValidator, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { TokenService } from 'app/services/token.service';
import { JarwisService } from 'app/services/jarwis.service';
import swal from 'sweetalert2';
import {  SnotifyService } from 'ng-snotify';

@Component({
    selector   : 'forgot-password-2',
    templateUrl: './forgot-password-2.component.html',
    styleUrls  : ['./forgot-password-2.component.scss'],
    animations : fuseAnimations
})
export class ForgotPassword2Component implements OnInit
{
    forgotPasswordForm: FormGroup;

    public form = {
        email: null
    };
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _token: TokenService,
        private _jarwis: JarwisService,
        private _notify: SnotifyService
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

    /**
     * On init
     */
    ngOnInit(): void
    {
        if (this._token.isValid()) {
            this._router.navigate(['/auth/login']);
        }
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.forgotPasswordForm = new FormGroup({

            'email' : new FormControl('', [
                Validators.required,
                Validators.email
            ])

        });
    }

    onSubmit(): void {
        this._jarwis.sendPasswordResetLink(this.form)
                    .subscribe(
                        data => this.handleResponse(data),
                        error => {
                            swal({
                                type: 'error',
                                titleText: error.error.error
                            });
                        }
                    );
    }

    handleResponse(res): void {
        this._router.navigate(['/auth/mail-confirmation', this.form.email ]);

    }

    get email(): AbstractControl {
        return this.forgotPasswordForm.get('email');
    }

    getErrorMessageEmail(): string {
        return this.email.hasError('required') ? 'Correo electronico requerido' : 
            this.email.hasError('email') ? 'Ingrese un correo electronico valido' :
                '';
    }

}
