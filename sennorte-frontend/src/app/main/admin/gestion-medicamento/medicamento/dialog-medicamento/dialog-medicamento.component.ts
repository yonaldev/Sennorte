import { Component, OnInit } from '@angular/core';
import { MedicamentoService } from '../medicamento.service';
import { FormGroup, FormControl, Validator, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import swal from 'sweetalert2';

@Component({
  selector: 'dialog-medicamento',
  templateUrl: './dialog-medicamento.component.html',
  styleUrls: ['./dialog-medicamento.component.scss']
})
export class DialogMedicamentoComponent implements OnInit {

  formMedicamento: FormGroup;

  form = {
    nombre_medicamento: null,
    dosis: null,
    id_tipo_aplicacion: null,
    id_unidad_medida: null
  };

  tipoAplicacion = [];
  unidadMedida = [];

  constructor(
    private _medicamento: MedicamentoService,
    private dialogRef: MatDialogRef<DialogMedicamentoComponent>
  ) { }

  ngOnInit(): void {
    this.getListas();

    this.formMedicamento = new FormGroup({
      'nombreMedicamento': new FormControl('', Validators.required),
      'tipoAplicacion': new FormControl('', Validators.required),
      'dosis': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.maxLength(10)
      ]),
      'unidadMedida': new FormControl('', Validators.required)
    });
  }

  get nombreMedicamentoForm(): any {
    return this.formMedicamento.get('nombreMedicamento');
  }

  get tipoAplicacionForm(): any {
    return this.formMedicamento.get('tipoAplicacion');
  }

  get dosisForm(): any {
    return this.formMedicamento.get('dosis');
  }

  get unidadMedidaForm(): any {
    return this.formMedicamento.get('unidadMedida');
  }

  getErrorMessageNombreMedicamento(): any {
    return this.nombreMedicamentoForm.hasError('required') ? 'Campo requerido' : 
      '';
  }

  getErrorMessageTipoAplicacion(): any {
    return this.tipoAplicacionForm.hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageDosis(): any {
    return this.dosisForm.hasError('required') ? 'Campo requerido' :
      this.dosisForm.hasError('pattern') ? 'Solo caracteres númericos' : 
        this.dosisForm.hasError('minlength') ? 'Máximo 10 carácteres' :
          '';
  }

  getErrorMessageUnidadMedida(): any {
    return this.unidadMedidaForm.hasError('required') ? 'Campo requerido' :
      '';
  }

  getListas(): void {
    this._medicamento.getTipoAplicacion()
                     .subscribe(
                        data => this.tipoAplicacion = data
                     );
    this._medicamento.getUnidadMedida()
                     .subscribe(
                        data => this.unidadMedida = data
                     );
  }

  onSubmit(): void {
    this._medicamento.registroMedicamento(this.form).subscribe(
      () =>  { 
        this.handleResponse(); 
      },
      () => this.handleError() 
    );
  }

  handleResponse(): any {
    swal({
      type: 'success',
      title: 'Acción realizada',
      titleText: 'Se ha guardado el medicamento'
    });
    this.closeModal();
    return true;
  }

  handleError(): void{
    swal({
      type: 'error',
      title: 'No se ha podido guardar'
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  refresh(): void{
    window.location.reload();
  }

}
