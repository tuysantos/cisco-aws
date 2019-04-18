import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/httpClient';
import { HttpClient } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  public login(user: string, password: string): Observable<string> {
    return ObservableOf(this.isValidUser(user, password)).pipe(
      map((response) => {
        this.sessionService.addUser(response);
        return response;
      })
    );
  }

  private isValidUser(user: string, pwd: string): string {
    return ((user === 'admin') && (pwd === 'supersecret')) ? '1111111111111' : '';
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
  }
}
