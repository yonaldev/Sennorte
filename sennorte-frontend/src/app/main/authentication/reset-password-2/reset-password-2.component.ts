import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'app/services/token.service';
import { JarwisService } from 'app/services/jarwis.service';
import swal from 'sweetalert2';

@Component({
    selector   : 'reset-password-2',
    templateUrl: './reset-password-2.component.html',
    styleUrls  : ['./reset-password-2.component.scss'],
    animations : fuseAnimations
})
export class ResetPassword2Component implements OnInit, OnDestroy
{
    resetPasswordForm: FormGroup;

    public error = [];

    public form = {
        email: null, 
        password: null,
        password_confirmation: null,
        resetToken: null
    };

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _token: TokenService,
        private _jarwis: JarwisService,
        _route: ActivatedRoute
    )
    {

        _route.queryParams.subscribe(params => {
            this.form.resetToken = params['token'];
        });

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

        // Set the private defaults
        this._unsubscribeAll = new Subject();
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
            this._router.navigate(['/home']);
        }
        this.resetPasswordForm = this._formBuilder.group({
            name           : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.resetPasswordForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.resetPasswordForm.get('passwordConfirm').updateValueAndValidity();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onSubmit(): void {
        this._jarwis.changePassword(this.form)
                    .subscribe(
                        data => this.handleResponse(data),
                        error => this.handleError(error)
                    );
    }

    handleResponse(data): void {
        swal({
            type: 'success',
            title: data.data,
            toast: true,
            timer: 3000,
            position: 'top-right'
        });
        this._router.navigate(['/auth/login']);
    }

    handleError(error): void {
        swal({
            type: 'warning',
            title: error.error.error,
            timer: 3000,
        });
    }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {'passwordsNotMatching': true};
};
