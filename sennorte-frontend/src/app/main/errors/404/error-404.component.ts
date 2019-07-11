import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector   : 'error-404',
    templateUrl: './error-404.component.html',
    styleUrls  : ['./error-404.component.scss'],
    animations : fuseAnimations
})
export class Error404Component
{
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private router: Router
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

    volver(): void {
        window.history.back();
    }

}
