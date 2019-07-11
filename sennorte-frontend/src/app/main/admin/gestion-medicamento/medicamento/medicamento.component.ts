import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { MedicamentoService } from './medicamento.service';
import { TokenService } from 'app/services/token.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.scss'],
  animations: fuseAnimations
})
export class MedicamentoComponent implements OnInit {

  constructor(
    private _medicamento: MedicamentoService,
    private _token: TokenService,
    private _router: Router
    ) { }

  ngOnInit(): void {
    this._medicamento.initialize();

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
