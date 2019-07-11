import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import swal from 'sweetalert2';
import { JarwisService } from '../../../../../services/jarwis.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from '../../../../../services/auth.service';
import { DialogMedicamentoComponent } from '../../medicamento/dialog-medicamento/dialog-medicamento.component';
import { MedicamentoModel } from './medicamento';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-dialog-formula',
  templateUrl: './dialog-formula.component.html',
  styleUrls: ['./dialog-formula.component.scss'],
  animations: [ fuseAnimations ]
})

export class DialogFormulaComponent implements OnInit {

  rolUser: number;
  maxDate = new Date();

  displayedColumns = ['medicamento', 'informacion', 'accion'];
  dataSource: MatTableDataSource<any>;

  registroFormula: FormGroup;
  recetaForm: FormGroup;

  perfil = false;
  
  formula = {
    documento: null,
    ref_formula: null,
    ips: null,
    fecha: null,
    medicoRemitente: null,
    encargadoFormula: null
  };

  receta: MedicamentoModel = new MedicamentoModel;
  medicamentosArray: Array<MedicamentoModel> = [];
  informacionMedicamento: string;

  edit = false;
  index = 0;

  medicamentos = [];

  exist = false;
  busqueda = false;
  mensaje: string;

  tiene = false;
  asocia = false;

  constructor(
    private _jarwis: JarwisService,
    private _auth: AuthService,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<DialogFormulaComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    @Inject(LOCALE_ID) private locale: string
  ) { 
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.rolUser = this._auth.getRol();

    if (this.data) {
      this.formula.documento = this.data;
      this.perfil = true;
      this.searchResidente(this.data);
    }

    // this.searchMedicamento('');

    this.registroFormula = this.perfil ? 
                            new FormGroup({
                              
                              'ref'       : new FormControl('', [
                                Validators.required,
                                Validators.minLength(10)
                              ]),
                              'ips'       : new FormControl('', [
                                Validators.required
                              ]),
                              'fecha'     : new FormControl('', [
                                Validators.required
                              ]),
                              'medico'      : new FormControl('', [
                                Validators.required
                              ])
                            }) : new FormGroup({
                              'documento' : new FormControl('', [
                                Validators.required,
                                Validators.pattern('[0-9]*'),
                                Validators.minLength(6)
                              ]),
                              'ref'       : new FormControl('', [
                                Validators.required,
                                Validators.minLength(10)
                              ]),
                              'ips'       : new FormControl('', [
                                Validators.required
                              ]),
                              'fecha'     : new FormControl('', [
                                Validators.required
                              ]),
                              'medico'      : new FormControl('', [
                                Validators.required
                              ])
                            });

    this.recetaForm = new FormGroup({
      'medicamento' : new FormControl('', [
        Validators.required
      ]),
      'dosis'       : new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'lapso'       : new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      'dias'        : new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ])
    });

  }

  validarVariables(): any {
    if ( this.asocia === false && this.exist === false && this.registroFormula.invalid === true ) {
      this.alert('Debe diligenciar los campos requeridos en el formulario');
    } else if ( this.asocia === false ) {
      this.alert('No se han asociado medicamentos');
    } else if ( this.exist === false ) {
      this.alert('El documento ingresado no existe');
    } else if ( this.registroFormula.invalid === true ) {
      this.alert('Algunos datos ingresados son incorrectos');
    }
    
  }

  alert(message: string): void {
    swal({
      type: 'warning',
      titleText: message,
      showConfirmButton: true
    });
  }

  guardar(): void {
    const itemReceta = new MedicamentoModel();

    itemReceta.id_medicamento = this.receta.id_medicamento;
    itemReceta.informacionMedicamento = this.getInfoMedicamento(this.receta.id_medicamento);
    itemReceta.dosis = this.receta.dosis;
    itemReceta.lapso = this.receta.lapso;
    itemReceta.dias = this.receta.dias; 
    
    this.asocia = true;
    this.medicamentosArray.push(itemReceta);
    
    this.dataSource.data = this.medicamentosArray;

    this.clear();

  }

  deleteItem(index: number): void {
    swal({
      type: 'question',
      titleText: '¿Esta seguro de quitar el item de la lista?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.medicamentosArray.splice(index, 1);
        if (this.medicamentosArray[0]) {
          this.asocia = true;
        } else {
          this.asocia = false;
        }
      }
    });
  }

  editItem(i: number): void {
    console.log(i);
    this.receta.id_medicamento  = this.medicamentosArray[i].id_medicamento;
    this.receta.dosis           = this.medicamentosArray[i].dosis;
    this.receta.lapso           = this.medicamentosArray[i].lapso;
    this.receta.dias            = this.medicamentosArray[i].dias;

    this.edit = true;
    this.index = i;
  }

  modifyItem(): void {
    this.medicamentosArray[this.index].id_medicamento = this.receta.id_medicamento;
    this.medicamentosArray[this.index].informacionMedicamento = this.getInfoMedicamento(this.receta.id_medicamento);
    this.medicamentosArray[this.index].dosis = this.receta.dosis;
    this.medicamentosArray[this.index].lapso = this.receta.lapso;
    this.medicamentosArray[this.index].dias = this.receta.dias;

    swal({
      type: 'success',
      title: 'Se han realizado los cambios',
      customClass: 'swal2angular',
      position: 'top-right',
      toast: true,
      timer: 9000,
      showConfirmButton: false
    });

    this.index = 0;
    this.edit = false;
    this.clear();
  }

  clear(edit?: boolean): void {
    if (!edit) {
      this.edit = false;
    }
    

    this.receta.id_medicamento = null;
    this.receta.dosis = null;
    this.receta.lapso = null;
    this.receta.dias = null;
    this.recetaForm.reset();
  }

  getInfoMedicamento(value: any): string {

    if (this.medicamentos && value) {
      const seleccionado = this.medicamentos.find(s => s.id_medicamento === value);
      if (seleccionado) {
        return `${seleccionado.nombre_medicamento} ${seleccionado.dosis}${seleccionado.unidad_medida} - ${seleccionado.nombre_aplicacion}`;
      } else {
        return '';
      }
    }

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

  searchMedicamento(value): void {
    this._jarwis.searchMedicamento(value).subscribe(
      data => {
        this.medicamentos = data;
      }
    );
  }

  closeDialog(): void {
    this._dialogRef.close();
  }

  openDialogMedicamento(): void {
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    
    this._dialog.open(DialogMedicamentoComponent, dialogConfig)
                .afterClosed()
                .subscribe(() => 
                  this.searchMedicamento('')
                );
  }

  numberValidator(control: AbstractControl): any {
    const valor = control.value;

    if (valor > 0) {
      return { numberValidator: true};
    } else {
      return { numberValidator: false };
    }

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

  getErrorMessageMedico(): any {
    return this.medico.hasError('required') ? 'Campo requerido' : 
      '';
  }

  onSubmit(): void {
    if (this.asocia && this.exist) {
      let guardo = false;
      

      for (let i = 0; i < this.medicamentosArray.length; i++) {
        this.medicamentosArray[i].id_formula = this.formula.ref_formula;
      }

      this.formula.fecha = this.transformDate(this.formula.fecha);
      this.formula.encargadoFormula = `${this._auth.getNameUser()} ${this._auth.getLastName()}`;
      
      this._jarwis.registroFormula(this.formula).subscribe(
        () => { 
          for (let index = 0; index < this.medicamentosArray.length; index++) {
            this._jarwis.registroReceta(this.medicamentosArray[index]).subscribe(
              response => { 
                guardo = true;
              },
              error => {
                guardo = false;
              }
            );
          }
          if (!guardo) {
            this.handleResponse(); 
            
          } else {
            this._jarwis.deleteFormula(this.medicamentosArray[0].id_formula)
                        .subscribe(
                          () => {
                            console.log('Se ha eliminado la fórmula por errores en la receta');
                            swal({
                              type: 'error',
                              title: 'Ups!',
                              titleText: 'No se ha podido guardar la fórmula'
                            });
                          }
                        );
          }
        },
        error => {  
          console.log(error);
          this.handleErrorFormula(error); 
        }
      );
    }
  }

  transformDate(date): any {
    const dateResult = formatDate(date, 'yyyy-MM-dd', this.locale);
    dateResult.substring(0, 9);
    return dateResult;
    
  }

  handleResponse(): void {
    swal({
      type: 'success',
      title: 'Se ha guardado la fórmula correctamente',
      timer: 5000
    });
    this._dialogRef.close();
  }

  handleErrorFormula(error): void {
    if (error.error.exception) {
      swal({
        type: 'error',
        titleText: `El número de formula ${this.formula.ref_formula} ya existe`,
        timer: 5000,
        showConfirmButton: false
      });
    } else {
      swal({
        type: 'error',
        title: 'Ups!',
        titleText: 'Ha ocurrido un error al guardar la formula',
        timer: 5000,
        showConfirmButton: false
      });
    }
    
  }

}
