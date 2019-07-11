import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MedicamentoService } from '../medicamento.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-editar-medicamento',
  templateUrl: './dialog-editar-medicamento.component.html',
  styleUrls: ['./dialog-editar-medicamento.component.scss']
})
export class DialogEditarMedicamentoComponent implements OnInit {

  formEditarMedicamento: FormGroup;

  form = {
    nombre_medicamento: null,
    dosis: null,
    id_tipo_aplicacion: null,
    id_unidad_medida: null
  };

  idMedicamento: number;
  nombreMedicamento: string;
  dosis: number;
  idTipoAplicacion: number;
  idUnidadMedida: string;

  unidadMedida = {};
  tipoAplicacion = {};

  constructor(
    private _medicamento: MedicamentoService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.asignarValores(data);
  }

  ngOnInit(): void {
    this.getListas();

    this.formEditarMedicamento = new FormGroup({
      'nombreMedicamento': new FormControl('', Validators.required),
      'tipoAplicacion': new FormControl('', Validators.required),
      'dosis': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'unidadMedida': new FormControl('', Validators.required)
    });
  }

  get nombreMedicamentoForm(): any {
    return this.formEditarMedicamento.get('nombreMedicamento');
  }

  get tipoAplicacionForm(): any {
    return this.formEditarMedicamento.get('tipoAplicacion');
  }

  get dosisForm(): any {
    return this.formEditarMedicamento.get('dosis');
  }

  get unidadMedidaForm(): any {
    return this.formEditarMedicamento.get('unidadMedida');
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
        '';
  }

  getErrorMessageUnidadMedida(): any {
    return this.unidadMedidaForm.hasError('required') ? 'Campo requerido' :
      '';
  }

  getListas(): void {
    this._medicamento.getTipoAplicacion().subscribe(
      data => this.tipoAplicacion = data
    );
    this._medicamento.getUnidadMedida().subscribe(
      data => this.unidadMedida = data
    );
  }

  asignarValores(data): void {
    this.idMedicamento = data.id_medicamento;

    this.nombreMedicamento = data.nombre_medicamento;
    this.form.nombre_medicamento = this.nombreMedicamento;

    this.dosis = data.dosis;
    this.form.dosis = this.dosis;

    this.idTipoAplicacion = data.id_tipo_aplicacion;
    this.form.id_tipo_aplicacion = this.idTipoAplicacion;

    this.idUnidadMedida = data.id_unidad_medida;
    this.form.id_unidad_medida = this.idUnidadMedida;
  }

  onSubmit(): void {
    this._medicamento.updateMedicamento(this.form, this.idMedicamento).subscribe(
      data => this.handleResponse(),
      error => this.handleError()
    );
  }

  handleResponse(): void {
    swal({
      type: 'success',
      title: 'Acción realizada!',
      titleText: `Se ha actualizado ${this.nombreMedicamento} por ${this.form.nombre_medicamento}`
    });
    this._dialogRef.close();
  }

  handleError(): void {
    swal({
      type: 'error',
      title: 'Ha ocurrido un error',
      titleText: 'No se ha podido actualizar la información del elemento'
    });
  }

  restaurar(): void {
    this.form.nombre_medicamento  = this.nombreMedicamento;
    this.form.dosis               = this.dosis;
    this.form.id_tipo_aplicacion  = this.idTipoAplicacion;
    this.form.id_unidad_medida    = this.idUnidadMedida; 
  }

  closeModal(): void {
    this._dialogRef.close();
  }

}
