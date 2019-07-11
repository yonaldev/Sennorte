import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialogRef } from '@angular/material';
import { JarwisService } from 'app/services/jarwis.service';
import { FormGroup, FormControlName, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-valoracion',
  templateUrl: './dialog-valoracion.component.html',
  styleUrls: ['./dialog-valoracion.component.scss']
})
export class DialogValoracionComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name'];
  step = 0;
  
  dataSource;
  
  form: FormGroup;

  constructor(
  private _matDialogRef: MatDialogRef<DialogValoracionComponent>,
    private _jarwis: JarwisService,
    
    @Inject(MAT_DIALOG_DATA) public data
    
    ) {
      
      this.form = new FormGroup({
        'antecedente_familiar': new FormControl('', Validators.required),
        'antecedente_residente': new FormControl('', Validators.required),
        'valoracion_cefalocaudal': new FormControl('', Validators.required),
        'informe_alergia': new FormControl('', Validators.required),
        'antecedente_quirurgico': new FormControl('', Validators.required),
        'especialidades': new FormControl('', Validators.required),
        'id_residente': new FormControl(data.id_residente, Validators.required)
      });
    }
    
    
    
    ngOnInit(): void {
    }

    onSubmit(): any{
      // console.log(this.form);
      this._jarwis.postValoracion( this.form.value ).subscribe(
        data => this.handleResponse(data),
        error => this.handleError()
      );
    }
    
    handleResponse(data): void {
      console.log(data);

      const NOMBRE = this.data.nombre2_residente ? `${this.data.nombre1_residente} ${this.data.nombre2_residente} ${this.data.apellido_residente}`
                                                  : `${this.data.nombre1_residente} ${this.data.apellido_residente}`;

      swal({
        title: `Fue ingresada la valoracion a ${NOMBRE}`, 
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
    
  setStep(index: number): any {
    this.step = index;
  }

  nextStep(): any {
    this.step++;
  }

  prevStep(): any {
    this.step--;
  }

  public close(): void{
    this._matDialogRef.close();
  }
}
