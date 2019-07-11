import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-demo-dialog-detalles',
  templateUrl: './demo-dialog-detalles.component.html',
  styleUrls: ['./demo-dialog-detalles.component.scss']
})
export class DemoDialogDetallesComponent implements OnInit {

  constructor(
    private _matDialogRef: MatDialogRef<DemoDialogDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data )  { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this._matDialogRef.close();
  }

}
