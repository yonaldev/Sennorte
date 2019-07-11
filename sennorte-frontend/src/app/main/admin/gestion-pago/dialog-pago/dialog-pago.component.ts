import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JarwisService } from 'app/services/jarwis.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-pago',
  templateUrl: './dialog-pago.component.html',
  styleUrls: ['./dialog-pago.component.scss']
})
export class DialogPagoComponent implements OnInit {

  formP: FormGroup;

  constructor(
    private _matDialogRef: MatDialogRef<DialogPagoComponent>,
    private _jarwis: JarwisService,

    @Inject(MAT_DIALOG_DATA) private inf

  ) { 
    this.formP = new FormGroup({
      'fecha_pago': new FormControl( '', Validators.required),
      'valor_pago': new FormControl( '', Validators.required),
      'observacion': new FormControl(''),
      'id_residente': new FormControl( inf.id_residente, Validators.required),
      'id_acudiente': new FormControl( inf.id_acudiente, Validators.required),
    });
  }

  ngOnInit(): void {
    // console.log(this.formP);
  }

  onSubmit(): any{
    this._jarwis.postPagos(this.formP.value).subscribe(
      data => this.handleResponse(data),
      error => { this.handleError(); }
    );

  }
  handleResponse(data): void {
      swal({
        title: `Fue ingresado el pago Correctamente`, 
        type        : 'success',
      });

    this._matDialogRef.close();
  }


  handleError(): any {
    swal({
      type: 'error',
      title: 'Error'
    });
  }
  public close(): void{
    this._matDialogRef.close();
  }
}
