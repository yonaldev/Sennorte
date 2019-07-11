import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { fuseAnimations } from '@fuse/animations';
import { DialogResidenteComponent } from './dialog-residente/dialog-residente.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-residente',
  templateUrl: './residente.component.html',
  styleUrls: ['./residente.component.scss'],
  animations: fuseAnimations
})
export class ResidenteComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  

  public openModalResidente(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '1000px';
    dialogConfig.panelClass = ['border-rounded'];

    this.dialog.open(DialogResidenteComponent, dialogConfig);
  }

}
