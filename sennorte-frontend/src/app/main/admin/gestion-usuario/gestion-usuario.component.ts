import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styles: [],
  animations: fuseAnimations
})
export class GestionUsuarioComponent implements OnInit {

  constructor(
    private _token: TokenService,
    private _router: Router
  ) { }

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
