import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
 
@Component({
  selector: 'estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
  animations: fuseAnimations
})
export class EstadisticasComponent implements OnInit {

  numResidentes = 0;

  constructor() { 
    
  }

  ngOnInit(): void {
    
    for (let i = 0; this.numResidentes < 10; i++) {
      this.numResidentes++;
    }

  }

}
