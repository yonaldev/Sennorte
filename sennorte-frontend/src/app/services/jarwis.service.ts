import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  // private baseUrl = 'http://localhost:8000/api';

  private baseUrl = 'http://sennortebackend.test/api';


  constructor(private http: HttpClient) { }

  // PROCEDIMIENTOS DE USUARIOS
  login(data): any {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  signup(data): any {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  sendPasswordResetLink(data): any {
    return this.http.post(`${this.baseUrl}/sendPasswordResetLink`, data);
  }

  changePassword(data): any {
    return this.http.post(`${this.baseUrl}/resetPassword`, data);
  }

  editUsers(data, id): any {
    return this.http.put(`${this.baseUrl}/user/${id}`, data);
  }

  getUsers(): any {
    return this.http.get(`${this.baseUrl}/user`);
  }

  getUserInfo(id): any {
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  validatePassword(data): any {
    return this.http.post(`${this.baseUrl}/userAdminPasswordConfirm`, data);
  }

  updateProfile(data): any {
    return this.http.put(`${this.baseUrl}/profileUpdate`, data);
  }
  changeStatusUsuario(data): any {
    return this.http.put(`${this.baseUrl}/usuarioStatus`, data);
  }

  // PROCEDIMIENTOS DE RESIDENTE

  searchResidente(id): any {
    return this.http.get(`${this.baseUrl}/residente/${id}`);
  }

  postResidente(data): any {
    return this.http.post(`${this.baseUrl}/residente`, data);
  }
  postAcudiente(data): any  {
    return this.http.post(`${this.baseUrl}/acudiente_controller`, data);
  }

  getAcudiente(): any {
    return this.http.get(`${this.baseUrl}/acudiente`);
  }

  getResidente(): any{
    return this.http.get(`${this.baseUrl}/residente`);
  }

  informacionResidente(id: any): any {
    return this.http.get(`${this.baseUrl}/residente_info/${id}`);
  }

  editarResidente(data, id): any {
    return this.http.put(`${this.baseUrl}/residente/${id}`, data);
  }

  changeStatusResidente(status, id): any {
    return this.http.put(`${this.baseUrl}/residente_status/${id}`, status);
  }

  editarAcudiente(data, id): any {
    return this.http.put(`${this.baseUrl}/acudiente_controller/${id}`, data);
  }

  cambiarEstadoAcudiente( data ): any {
    return this.http.put(`${this.baseUrl}/estado_acudiente`, data);
  }

  // PROCEDIMIENTOS DE MEDICAMENTOS
  registroMedicamento(data): any {
    return this.http.post(`${this.baseUrl}/medicamento`, data);
  }

  getMedicamentos(): any {
    return this.http.get(`${this.baseUrl}/medicamento`);
  }

  updateMedicamento(data, id): any {
    return this.http.put(`${this.baseUrl}/medicamento/${id}`, data);
  }

  changeStatusMedicamento(data): any {
    return this.http.put(`${this.baseUrl}/medicamentoStatus`, data);
  }

  searchMedicamento(value): any {
    return this.http.get(`${this.baseUrl}/medicamento/${value}`);
  }

  buscarMedicamento(value): any {
    return this.http.get(`${this.baseUrl}/searchMedicamento/${value}`);
  }

  // PROCEDIMIENTOS FORMULA Y RECETA
  registroFormula(data): any {
    return this.http.post(`${this.baseUrl}/formula`, data);
  }

  registroReceta(data): any {
    return this.http.post(`${this.baseUrl}/receta`, data);
  }

  getFormula(): any {
    return this.http.get(`${this.baseUrl}/formula`);
  }

  searchFormula(id): any {
    return this.http.get(`${this.baseUrl}/formula/${id}`);
  }

  getReceta(idFormula): any {
    return this.http.get(`${this.baseUrl}/receta/${idFormula}`);
  }

  deleteFormula(id): any {
    return this.http.delete(`${this.baseUrl}/formula/${id}`);
  }

  // PROCEDIMIENTOS DE SEGUIMIENTO
  
  seguimientoR(): any {
    return this.http.get(`${this.baseUrl}/seguimientoR`);
  }
  getResidenteSegui( id ): any {
    return this.http.get(`${this.baseUrl}/residente/${id}`);
  }

  getResidenteS(): any {
    return this.http.get(`${this.baseUrl}/seguimiento`);
  }

  informe(id): any {
    return this.http.get(`${this.baseUrl}/seguimiento/informe/${id}`);
  }

  listarInforme(id): any {
    return this.http.get(`${this.baseUrl}/seguimiento/${id}`);
  }

  Nseguimiento( data ): any {
    return this.http.post(`${this.baseUrl}/seguimiento`, data);
  }

  // Procedimientos valoración 
  postValoracion( data ): any {
    return this.http.post(`${this.baseUrl}/valoracion`, data);
  }

  getValoracion( id ): any {
    return this.http.get(`${this.baseUrl}/valoracion/${id}`);
  }

  valoracionR(): any {
    return this.http.get(`${this.baseUrl}/valoracionR`);
  }
  
  
  // PROCEDIMIENTOS DE EVENTOS
  postEvento(data): any {
    return this.http.post(`${this.baseUrl}/evento`, data);
  }

  getEventos(): any {
    return this.http.get(`${this.baseUrl}/evento`);
  }

  getTopEventos(): any {
    return this.http.get(`${this.baseUrl}/evento_top`);
  }

  deleteEvento(id): any {
    return this.http.delete(`${this.baseUrl}/evento/${id}`);
  }

  // PROCEDIMIENTOS DE NOVEDADES
  postNovedad(data): any {
    return this.http.post(`${this.baseUrl}/novedad`, data);
  }

  getNovedades(): any {
    return this.http.get(`${this.baseUrl}/novedad`);
  }

  deleteNovedad(id): any {
    return this.http.delete(`${this.baseUrl}/novedad/${id}`);
  }

  // PETICIONES GUARDADO

  registrarPeticion(data): any {
    return this.http.post(`${this.baseUrl}/guardar`, data);
  }  

  getInfoPagos(): any {
    return this.http.get(`${this.baseUrl}/pagoInf`);
  }

  postPagos(data): any {
    return this.http.post(`${this.baseUrl}/pago`, data);
  }

  listarpagos(id): any {
    return this.http.get(`${this.baseUrl}/pago/${id}`);
  }

  // PROCEDIMIENTOS DE LISTADO
  getHabitacion(): any {
    return this.http.get(`${this.baseUrl}/habitaciones`);
  }

  getEstadoCivil(): any {
    return this.http.get(`${this.baseUrl}/estado_civil`);
  }

  getTipoAplicacion(): any {
    return this.http.get(`${this.baseUrl}/tipo_aplicacion`);
  }

  getAcudientes(): any {
    return this.http.get(`${this.baseUrl}/acudiente_controller`);
  }

  getUnidadMedida(): any {
    return this.http.get(`${this.baseUrl}/unidad_medida`);
  }

  getRoles(): any {
    return this.http.get(`${this.baseUrl}/rol`);
  }

  getCama(): any {
    return this.http.get(`${this.baseUrl}/cama`);
  }

  getEps(): any {
    return this.http.get(`${this.baseUrl}/eps`);
  }

}
