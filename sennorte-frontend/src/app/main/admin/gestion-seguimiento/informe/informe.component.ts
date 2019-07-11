import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { JarwisService } from 'app/services/jarwis.service';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss']
})
export class InformeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource;
  displayedColumns = ['informe'];


  constructor(
    private _matDialogRef: MatDialogRef<InformeComponent>,
    private _jarwis: JarwisService,
    
    @Inject(MAT_DIALOG_DATA) private inf
    
  ) { }

  ngOnInit(): any{
    this.verInforme();
  }
  verInforme(): any{
    this._jarwis.informe(this.inf).subscribe(
        data => {
                this.dataSource = new  MatTableDataSource(data);
                },
        error => console.log(error)
    );
}
public close(): void{
  this._matDialogRef.close();
}
}
