import { Component, Inject } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { TokenService } from 'app/services/token.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector   : 'mail-confirm',
    templateUrl: './mail-confirm.component.html',
    styleUrls  : ['./mail-confirm.component.scss'],
    animations : fuseAnimations
})
export class MailConfirmComponent
{
    email: string;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(
        token: TokenService,
        router: Router,
        private _fuseConfigService: FuseConfigService,
        _activatedRoute: ActivatedRoute
    )
    {
        
        if (token.isValid()) {
            router.navigate(['/home']);
        }
        
        _activatedRoute.params.subscribe(params => {
            this.email = params['email'];
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
    }

}
