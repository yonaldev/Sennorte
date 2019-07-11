import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userName;
  public rol;
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean): any {
    this.loggedIn.next(value);
  }

  constructor(
    private token: TokenService,
  ) { }

  setNameUser(userName): void {
    localStorage.setItem('userName', userName);
  }

  setLastName(lastName): void {
    localStorage.setItem('apellido', lastName);
  }

  setRol(rol): void {
    localStorage.setItem('rol', rol);
  }

  setDocument(document): void {
    localStorage.setItem('document', document);
  }

  getDocument(): any {
    return localStorage.getItem('document');
  }

  getNameUser(): any {
    return localStorage.getItem('userName');
  }

  getLastName(): any {
    return localStorage.getItem('apellido');
  }

  getRol(): any {
    return localStorage.getItem('rol');
  }

  removeUser(): void {
    localStorage.removeItem('rol');
    localStorage.removeItem('userName');
    localStorage.removeItem('apellido');
    localStorage.removeItem('document');
  }

}
