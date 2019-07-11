import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-gestion-valoracion',
  templateUrl: './gestion-valoracion.component.html',
  styleUrls: ['./gestion-valoracion.component.scss'],
  animations: fuseAnimations
})
export class GestionValoracionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void{
  }

}
