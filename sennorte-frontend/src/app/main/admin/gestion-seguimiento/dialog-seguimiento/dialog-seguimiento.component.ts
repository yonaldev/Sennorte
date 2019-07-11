import { Component, OnInit, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { fuseAnimations } from '@fuse/animations';
import { JarwisService } from 'app/services/jarwis.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { TokenService } from 'app/services/token.service';

@Component({
  selector: 'app-dialog-seguimiento',
  templateUrl: './dialog-seguimiento.component.html',
  styleUrls: ['./dialog-seguimiento.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  animations: fuseAnimations
})
export class DialogSeguimientoComponent implements OnInit {
  
  dataSource;
  form1: FormGroup;
  // displayedColumns = ['documento', 'nombrecompleto', 'apellido'];

  
  constructor(
    private _matDialogRef: MatDialogRef<DialogSeguimientoComponent>,
    private jarwis: JarwisService,
    private token: TokenService,
    
    @Inject(MAT_DIALOG_DATA) private data,
    
    ) 
    {
      this.form1 = new FormGroup({
        'id_residente': new FormControl( data.id_residente, Validators.required),
        'nombre1_residente': new FormControl( data.nombre1_residente, Validators.required),
        'nombre2_residente': new FormControl( data.nombre2_residente, Validators.required),
        'apellido_residente': new FormControl( data.apellido_residente, Validators.required),
        'informe': new FormControl('', [Validators.required, Validators.minLength(20)]),
      });
            // this.form1.setValue(data);      
    }
    
    
    ngOnInit(): void {
      // console.log(this.dataSource);
      
    }

    getResidente(): any{
      this.jarwis.getResidenteSegui(this.data.id_residente).subscribe(
        data => this.dataSource = new MatTableDataSource(data)
      );
    }

    onSubmit(): any {
      this.jarwis.Nseguimiento( this.form1.value ).subscribe(
        data =>  this.handleResponse(data),
        error => { this.handleError(); 
                    console.log(error); }
        );
    }
    
    handleResponse(data): void {
      if (this.data.lugar === 1) {
        swal({
          title: `Fue ingresado el informe`, 
          type        : 'success',
        });
      } else {
        swal({
          title: `Fue ingresado el informe a ${this.form1.get('nombre1_residente').value} ${this.form1.get('apellido_residente').value}`, 
          type        : 'success',
        });
      }
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
