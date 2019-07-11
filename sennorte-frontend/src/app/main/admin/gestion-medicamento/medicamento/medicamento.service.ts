import { Injectable } from '@angular/core';
import { JarwisService } from 'app/services/jarwis.service';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  public tipoAplicacion = [];
  public unidadMedida = [];

  constructor(
    private _jarwis: JarwisService
  ) { }

  initialize(): void {
    this.getTipoAplicacion();
    this.getUnidadMedida();
  }

  getTipoAplicacion(): any {
    return this._jarwis.getTipoAplicacion();
  }

  getUnidadMedida(): any {
    return this._jarwis.getUnidadMedida();
  }

  registroMedicamento(data): any {
    return this._jarwis.registroMedicamento(data);
  }

  updateMedicamento(data, id): any {
    return this._jarwis.updateMedicamento(data, id);
  }

}
