import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { JarwisService } from 'app/services/jarwis.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { formatDate } from '@angular/common';

@Component({
  selector: 'dialog-editar-formula',
  templateUrl: './dialog-editar-formula.component.html',
  styleUrls: ['./dialog-editar-formula.component.scss'],
  animations: fuseAnimations
})
export class DialogEditarFormulaComponent implements OnInit {

  busqueda = false;
  exist = false;
  mensaje: string;
  maxDate = new Date();

  formula = {
    residente_id_residente: null,
    fecha: null,
    ips: null,
    fecha_formula: null
  };

  formulaRespaldo: any[];

  medicamentosArray: any[];
  medicamentosArrayRespaldo: any[];
  medAddArray = [];

  registroFormula: FormGroup;

  datasource: MatTableDataSource<any>;
  medAdd: MatTableDataSource<any>;
  medDelete: MatTableDataSource<any>;
  displayedColumns = ['medicamento', 'especificacion', 'accion'];

  constructor(
    private _dialogRef: MatDialogRef<DialogEditarFormulaComponent>,
    private _jarwis: JarwisService,
    private _dialog: MatDialog,
    @Inject(LOCALE_ID) private locale,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.peticionDatos(this.data);
    this.medAdd = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.registroFormula = new FormGroup({
      'documento': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(8)
      ]),
      'ref': new FormControl('', []),
      'ips': new FormControl('', [
        Validators.required
      ]),
      'fecha': new FormControl('', [
        Validators.required
      ]),
      'medico': new FormControl('', [
        Validators.required
      ])
    });

  }

  peticionDatos(id_formula): any {

    this._jarwis.searchFormula(id_formula)
      .subscribe(
        data => {
          this.transformDate(data[0].fecha_formula);
          this.formula = data[0];
          this.formulaRespaldo = data;
          this.searchResidente(this.formula.residente_id_residente);
          this._jarwis.getReceta(id_formula)
            .subscribe(
              response => {
                this.medicamentosArray = response;
                this.medicamentosArrayRespaldo = response;
                this.datasource = new MatTableDataSource(response);

              });
        }
      );
  }

  transformDate(date): Date {
    date.substring(0, 10);
    return date;
  }

  searchResidente(documento): void {
    this._jarwis.searchResidente(documento).subscribe(
      data => {
        this.busqueda = true;
        if (data[0]) {
          this.exist = true;
          this.mensaje = `${data[0].nombre1_residente} ${data[0].nombre2_residente} ${data[0].apellido_residente}`;
        } else {
          this.exist = false;
          this.mensaje = 'No se han encontrado resultados';
        }
      }
    );
  }

  searMedicamentoById(id): string {
    let mensaje: string;

    this._jarwis.buscarMedicamento(id)
      .subscribe(
        data => mensaje = `${data.nombre_medicamento} ${data.dosis}${data.unidad_medida}`
      );

    return mensaje;

  }

  edit(data, id): void {
    swal({
      title: 'Ingrese su contraseña',
      html: '<small>Recuerde que solo el administrador tiene permiso para cambiar la información de una fórmula médica</small>',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        swal.showValidationError('La contraseña es incorrecta');
      }
    }).then((result) => {
      if (result.value) {
        swal({
          title: result.value
        });
      }
    });
  }

  close(): void {
    this._dialogRef.close();
  }

  openDialogEditarMedicamento(data): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.width = '700px';
    dialogConfig.autoFocus = false;

    const dialogRef = this._dialog.open(DialogEditarMedicamentoRecetaComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(response => {

      });
  }

  openAddMedicamento(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.autoFocus = false;

    const dialogRef = this._dialog.open(DialogAddMedicamentoRecetaComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((response) => {
        this.medAddArray.push(response);
        this.medAdd.data = this.medAddArray;
      });

  }

  deleteItem(index): void {
    swal({
      title: '¿Está seguro que desea eliminar este medicamento?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then(result => {
      if ( result.value ) {
        this.medAddArray.splice(index, 1);
        this.medAdd.data = this.medAddArray;  
      }
    });
  }

  get documento(): any {
    return this.registroFormula.get('documento');
  }

  get referencia(): any {
    return this.registroFormula.get('ref');
  }

  get ips(): any {
    return this.registroFormula.get('ips');
  }

  get fecha(): any {
    return this.registroFormula.get('ips');
  }

  get medico(): any {
    return this.registroFormula.get('medico');
  }

  getErrorMessageDocumento(): any {
    return this.documento.hasError('required') ? 'Campo requerido' :
      this.documento.hasError('pattern') ? 'Solo caracteres númericos' :
        this.documento.hasError('minlength') ? 'Minimo 8 caracteres' :
          '';
  }

  getErrorMessageReferencia(): any {
    return this.referencia.hasError('required') ? 'Campo requerido' :
      this.referencia.hasError('minlength') ? 'Minimo 10 caracteres' :
        '';
  }

  getErrorMessageIPS(): any {
    return this.ips.hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageFecha(): any {
    return this.fecha.hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageMedico(): any {
    return this.medico.hasError('required') ? 'Campo requerido' :
      '';
  }

}

@Component({
  selector: 'dialog-editar-medicamento-receta',
  templateUrl: './dialog-editar-receta.component.html',
  styleUrls: ['./dialog-editar-formula.component.scss'],
  animations: fuseAnimations
})

export class DialogEditarMedicamentoRecetaComponent implements OnInit {

  recetaForm: FormGroup;
  public tiene;
  public rolUser;

  medicamentos: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MedicamentoReceta,
    private _jarwis: JarwisService,
    private _dialogRef: MatDialogRef<DialogEditarMedicamentoRecetaComponent>
  ) { }

  ngOnInit(): void {

    this.searchMedicamento('');

    this.recetaForm = new FormGroup({
      'medicamento': new FormControl('', [
        Validators.required
      ]),
      'dosis': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'lapso': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'dias': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ])
    });
  }

  get medicamento(): any {
    return this.recetaForm.get('medicamento');
  }

  get dosis(): any {
    return this.recetaForm.get('dosis');
  }

  get lapso(): any {
    return this.recetaForm.get('lapso');
  }

  get dias(): any {
    return this.recetaForm.get('dias');
  }

  getErrorMessageMedicamento(): any {
    return this.medicamento.hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageDosis(): any {
    return this.dosis.hasError('required') ? 'Campo requerido' :
      this.dosis.hasError('pattern') ? 'Solo se permiten carácteres númericos' :
        '';
  }

  getErrorMessageLapso(): any {
    return this.lapso.hasError('required') ? 'Campo requerido' :
      this.lapso.hasError('pattern') ? 'Solo se permiten carácteres númericos' :
        '';
  }

  getErrorMessageDias(): any {
    return this.dias.hasError('required') ? 'Campo requerido' :
      this.dias.hasError('pattern') ? 'Solo se permiten carácteres númericos' :
        '';
  }

  OnNoClick(): void {
    this._dialogRef.close();
  }

  searchMedicamento(value): void {
    this._jarwis.searchMedicamento(value).subscribe(
      data => {
        this.medicamentos = data;
      }
    );
  }

}

@Component({
  selector: 'dialog-add-medicamento-receta',
  templateUrl: './dialog-add-receta.component.html',
  styleUrls: ['./dialog-editar-formula.component.scss'],
  animations: fuseAnimations
})

export class DialogAddMedicamentoRecetaComponent implements OnInit {

  recetaForm: FormGroup;
  public tiene;

  medicamentos: any[] = [];

  medReceta = {
    dosis_medicamento: null,
    lapso: null,
    dias: null,
    medicamento_id_medicamento: null,
    informacion_medicamento: null
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: MedicamentoReceta,
    private _jarwis: JarwisService,
    private _dialogRef: MatDialogRef<DialogEditarMedicamentoRecetaComponent>
  ) { }

  ngOnInit(): void {

    this.searchMedicamento('');

    this.recetaForm = new FormGroup({
      'medicamento': new FormControl('', [
        Validators.required
      ]),
      'dosis': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'lapso': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'dias': new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ])
    });
  }

  assignInfo(): any {
    this.medReceta.informacion_medicamento = this.getInfoMedicamento(this.medReceta.medicamento_id_medicamento);
  }

  getInfoMedicamento(value): string {
    if (this.medicamentos && value) {
      const seleccionado = this.medicamentos.find(s => s.id_medicamento === value);
      if (seleccionado) {
        return `${seleccionado.nombre_medicamento} ${seleccionado.dosis}${seleccionado.unidad_medida} - ${seleccionado.nombre_aplicacion}`;
      } else {
        return '';
      }
    }
    return null;
  
  }

  get medicamento(): any {
    return this.recetaForm.get('medicamento');
  }

  get dosis(): any {
    return this.recetaForm.get('dosis');
  }

  get lapso(): any {
    return this.recetaForm.get('lapso');
  }

  get dias(): any {
    return this.recetaForm.get('dias');
  }

  getErrorMessageMedicamento(): any {
    return this.medicamento.hasError('required') ? 'Campo requerido' :
      '';
  }

  getErrorMessageDosis(): any {
    return this.dosis.hasError('required') ? 'Campo requerido' :
      this.dosis.hasError('pattern') ? 'Solo se permiten carácteres númericos' :
        '';
  }

  getErrorMessageLapso(): any {
    return this.lapso.hasError('required') ? 'Campo requerido' :
      this.lapso.hasError('pattern') ? 'Solo se permiten carácteres númericos' :
        '';
  }

  getErrorMessageDias(): any {
    return this.dias.hasError('required') ? 'Campo requerido' :
      this.dias.hasError('pattern') ? 'Solo se permiten carácteres númericos' :
        '';
  }

  OnNoClick(): void {
    this._dialogRef.close();
  }

  searchMedicamento(value): void {
    this._jarwis.searchMedicamento(value).subscribe(
      data => {
        this.medicamentos = data;
      }
    );
  }


}

export interface MedicamentoReceta {
  dosis: number;
  lapso: number;
  dias: number;
  id_medicamento: number;
  informacion_medicamento: string;
  dosis_medicamento: number;
  medicamento_id_medicamento: number;
}

export interface Formula {
  id_formula: string;
  residente_id_residente: number;

}

