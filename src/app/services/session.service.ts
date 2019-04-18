import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userName = 'USER_NAME';
  private userPassword = 'USER_PASSWORD';
  private _isLogged = 'IS_LOGGED';
  private hasClientStorage = false;

  constructor() {
    this.hasClientStorage = window.localStorage !== undefined;
   }
  
  addUser(token: string){
    sessionStorage.setItem('currentUser', token);
  }

  addToken(token: string){
    sessionStorage.setItem('token', token);
  }

  getToken(): string{
    return sessionStorage.getItem('token');
  }

  removeUser(){
    sessionStorage.removeItem('token');
  }

  getUser(): string{
    return sessionStorage.getItem('currentUser');
  }

  public getHeader(): null | string {
    if (!this.hasClientStorage) {
      return null;
    }
    return sessionStorage.getItem(environment.header);
  }

  public setHeader(): void {
    sessionStorage.setItem(environment.header, environment.headerValue);
  }

  public getUserName(): null | string {
    if (!this.hasClientStorage) {
      return null;
    }
    return sessionStorage.getItem(this.userName);
  }

  public setUserName(user: string): void {
    sessionStorage.setItem(this.userName, user);
  }

  public getUserPassword(): null | string {
    if (!this.hasClientStorage) {
      return null;
    }
    return sessionStorage.getItem(this.userPassword);
  }

  public setUserPassword(pwd: string): void {
    sessionStorage.setItem(this.userPassword, pwd);
  }

  public setIsLogged(value: string): void {
    sessionStorage.setItem(this._isLogged, value);
  }

  public getIsLogged(): boolean {
    return JSON.parse(sessionStorage.getItem(this._isLogged));
  }

  public resetUserCredentials(): void{
    sessionStorage.removeItem(this.userName);
    sessionStorage.removeItem(this.userPassword);
  }

  public resetHeader(): void {
    sessionStorage.removeItem(environment.header);
  }
}
