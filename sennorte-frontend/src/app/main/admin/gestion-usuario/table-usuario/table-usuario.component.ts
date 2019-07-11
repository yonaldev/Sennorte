import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig, MatSlideToggleChange } from '@angular/material';

import { JarwisService } from 'app/services/jarwis.service';

import { DialogEditarUsuarioComponent } from '../dialog-editar-usuario/dialog-editar-usuario.component';
import { DialogUsuarioComponent } from '../dialog-usuario/dialog-usuario.component';

import swal from 'sweetalert2';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'table-usuario',
  templateUrl: './table-usuario.component.html',
  styleUrls: ['./table-usuario.component.scss']
})

export class TableUsuarioComponent implements OnInit {

  displayedColumns = ['document', 'name', 'email', 'rol', 'accion'];
  dataSource: MatTableDataSource<UserData>;
  isChecked = false;

  users: UserData[] = [];

  rol: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _dialog: MatDialog,
    private jarwis: JarwisService,
    private matDialog: MatDialog,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.rol = this._auth.getRol();
    // validar el tipo de usuario
    if (this.rol !== '1' && this.rol !== '5' ) {
      this._router.navigate(['/home']);
    }

    // Asignar los datos a la variable dataSource para renderizar en la tabla
    this.getUsuarios();

  }

  getUsuarios(): void {
    this.jarwis.getUsers().subscribe(
      data => {
        this.users = data;
        this.getUsersState(1);
      }
    );
  }

  getUsersState(estado): any {
    if (estado === 1) {
      this.dataSource = new MatTableDataSource(this.users.filter(items => items.estado === 1));
      this.configPaginator();
    } else if (estado === 0) {
      this.dataSource = new MatTableDataSource(this.users.filter(items => items.estado === 0));
      this.configPaginator();
    }
  } 
  
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); 
    }
    
  }

  rowClicked(row: any): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.width = '600px';
    dialogConfig.panelClass = 'border-rounded';
    dialogConfig.data = row;

    this._dialog.open(DialogEditarUsuarioComponent, dialogConfig)
                .afterClosed()
                .subscribe(
                  () => this.getUsuarios()
                );
  }

  configPaginator(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
    this.dataSource.paginator._intl.lastPageLabel = 'Última página';
    this.dataSource.paginator._intl.firstPageLabel = 'Página inicial';
    this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator._intl.nextPageLabel = 'Página siguiente';
    this.dataSource.sort = this.sort;
  }

  public openModalUsuario(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';
    dialogConfig.panelClass = ['border-rounded'];

    this.matDialog.open(DialogUsuarioComponent, dialogConfig)
                  .afterClosed()
                  .subscribe(() => 
                    this.getUsuarios()
                  );
  }

  // ******* METODO PARA CAMBIO DE PAGINA (ESTADOS)

  public toggle(event: MatSlideToggleChange ): any {
    if (!event.checked) {
      this.getUsersState(1);
    } else if (event.checked) {
      this.getUsersState(0);
    }
  }

  habilitarUsuario(id, status, name): void {
    const FLAG = status === 1 ? 'habilitar' : 'inhabilitar';
    swal({
      type                  : 'question',
      title                 : `¿Esta seguro que desea ${FLAG} a ${ name }?`,
      width                 : 400,
      showConfirmButton     : true,
      confirmButtonText     : 'Aceptar',
      showCancelButton      : true
    }).then((result) => {
      if (result.value) {
        this.changeStatus(status, id);
      }
    });
  }

  changeStatus(status, id): void {
    const object = {
      status: status,
      id: id
    };

    this.jarwis.changeStatusUsuario(object).subscribe(
      data => {
        swal({
          type: 'success',
          title: 'Se ha cambiado el estado del usuario'
        });
        this.getUsuarios();
        this.isChecked = false;
      },
      error => {
        swal({
          type: 'error',
          title: 'No se ha podido realizar la acción'
        });
        this.getUsuarios();
      }
    );
  }

}

export interface UserData {
  document: string;
  name: string;
  lastname: string;
  userName: string;
  email: string;
  rol: number;
  estado: number;
}
