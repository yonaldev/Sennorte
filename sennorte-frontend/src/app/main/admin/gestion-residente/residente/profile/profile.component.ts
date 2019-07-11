import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { JarwisService } from 'app/services/jarwis.service';
import { AuthService } from 'app/services/auth.service';
import { TokenService } from 'app/services/token.service';
import swal from 'sweetalert2';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProfileComponent implements OnInit {
    data: any;
    nombre: any;
    id: any;

    rol: any;

    cargando = true;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _jarwis: JarwisService,
        private _auth: AuthService,
        private _token: TokenService,
        private _router: Router
    ) {
        this.rol = this._auth.getRol();

        if (!this._token.isValid()) {
            this._router.navigate(['auth', 'login']);
        } else {
            this._activatedRoute.params.subscribe(params => {
                this.id = params['id'];
                this._jarwis.informacionResidente(this.id)
                    .subscribe(
                        data => {
                            if (data[0].estado === 1) {
                                this.data = data[0];
                                this.nombre = this.data.nombre2_residente ? `${this.data.nombre1_residente} ${this.data.nombre2_residente} ${this.data.apellido_residente}` :
                                    `${this.data.nombre1_residente} ${this.data.apellido_residente}`;
                                this.cargando = false;
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
            });
        }


    }

    ngOnInit(): void {

    }

}
