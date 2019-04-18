import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  addUser(token: string){
    sessionStorage.setItem('currentUser', token);
  }

  removeUser(){
    sessionStorage.removeItem('currentUser');
  }

  getUser(): string{
    return sessionStorage.getItem('currentUser');
  }
}
