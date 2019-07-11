import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

import swal from 'sweetalert2';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: fuseAnimations
})
export class HomeComponent implements OnInit {

  constructor(
    private _token: TokenService,
    private _router: Router
  ) { 
  }

  ngOnInit(): void {
    if (!this._token.isValid()) {
      this._router.navigate(['/auth/login']);
      swal({
        type: 'warning',
        titleText: 'No se ha iniciado sesión, debes iniciar sesión',
        toast: true,
        position: 'top-end',
        customClass: 'swal2angular',
        showConfirmButton: false,
        timer: 9000
      });
    }
  }

}
