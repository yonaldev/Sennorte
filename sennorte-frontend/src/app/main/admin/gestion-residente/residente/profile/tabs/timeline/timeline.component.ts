import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileFakeDb } from '../../profile';
import { JarwisService } from 'app/services/jarwis.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogSeguimientoComponent } from 'app/main/admin/gestion-seguimiento/dialog-seguimiento/dialog-seguimiento.component';

@Component({
    selector   : 'profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls  : ['./timeline.component.scss'],
    animations : fuseAnimations
})
export class ProfileTimelineComponent implements OnInit, OnDestroy
{
    @Input() id: any;
    seguimiento = [];

    timeline = ProfileFakeDb.timeline;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private _profileService: ProfileService,
        private _jarwis: JarwisService,
        private _dialog: MatDialog
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
       this.listarSeguimientos();
    }

    listarSeguimientos(): any {
        this._jarwis.listarInforme(this.id)
            .subscribe(
                data => this.seguimiento = data
            );
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

    openModalSeguimiento(id): void {

        const data = {
            id_residente: id,
            lugar: 1
        };

        const dialogConfig = new MatDialogConfig;
        dialogConfig.data = data;
        dialogConfig.width = '700px';

        const ref = this._dialog.open(DialogSeguimientoComponent, dialogConfig);
        ref.afterClosed()
            .subscribe(
                response => this.listarSeguimientos()
            );
    }

}
