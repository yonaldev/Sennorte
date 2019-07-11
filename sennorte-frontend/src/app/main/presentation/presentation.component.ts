import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { TokenService } from 'app/services/token.service';
import { JarwisService } from 'app/services/jarwis.service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  animations: [fuseAnimations]
})
export class PresentationComponent implements OnInit {

  state = 'normal';

  loggedstatus = false;
  name: string;

  eventos: any;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _auth: AuthService,
    private _router: Router,
    private _token: TokenService,
    private _jarwis: JarwisService
  ) {

    this.getEventos();

    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  getEventos(): void {
    this._jarwis.getTopEventos()
        .subscribe(
          data => {
            this.eventos = data;
          }
        );
  }

  ngOnInit(): void {
    if (this._token.isValid()) {
      this.loggedstatus = true;
      this.name = `${this._auth.getNameUser()} ${this._auth.getLastName()}`;
    } else if (!this._token.isValid()) {
      this.loggedstatus = false;
    }
  }

  logout(event: MouseEvent): void {
    event.preventDefault();
    this._token.remove();
    this._auth.changeAuthStatus(false);
    this._auth.removeUser();
    this.loggedstatus = false;
  }

}
