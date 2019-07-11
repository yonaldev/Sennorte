import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigation } from '@fuse/types';

import { navigation, navigation_enfermera } from './../../../app/navigation/navigation';
import { NavbarVerticalStyle1Component } from './../../../app/layout/components/navbar/vertical/style-1/style-1.component';

@Component({
    selector     : 'fuse-navigation',
    templateUrl  : './navigation.component.html',
    styleUrls    : ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavigationComponent implements OnInit
{

    userLogged: any = {
        nombre: '',
        rol   : 0
    };

    @Input()
    layout = 'vertical';

    @Input()
    navigation: FuseNavigation[];

    tipo_menu: FuseNavigation[] = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private _validarUsuario: NavbarVerticalStyle1Component
    )
    {
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
        this.userLogged = this._validarUsuario.informacionUsuario();

        this.tipo_menu = this.validarTipoMenu();

        // Load the navigation either from the input or from the service
        this.navigation = this.tipo_menu ;

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.navigation = this.tipo_menu;
            });
    }

    validarTipoMenu(): FuseNavigation[] {

        let dato: FuseNavigation[] = [] ; 

        if (this.userLogged.rol === '1') {
            dato = navigation;
        } else if (this.userLogged.rol === '2') {
            dato = navigation_enfermera;
        }

        return dato;
    }

}
