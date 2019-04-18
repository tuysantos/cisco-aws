import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/httpClient';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  public login(userId: string, password: string): Observable<string> {
    const params = new HttpParams()
      .set('user', userId)
      .set('pwd', password);
    return this.http.get<string>(`${environment.apiEndPoint}/login/${userId}/${password}`)
        .pipe(
          map( (response: string) => {
            console.log('response', response);
            this.sessionService.addUser(response);
            this.sessionService.setUserName(userId);
            this.sessionService.setUserPassword(password);
            this.sessionService.setHeader();
            return response;
          }),
          catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error); 
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error);
  }

    // return ObservableOf(this.isValidUser(user, password)).pipe(
    //   map((response) => {
    //     this.sessionService.addUser(response);
    //     this.sessionService.setUserName(user);
    //     this.sessionService.setUserPassword(password);
    //     this.sessionService.setHeader();
    //     return response;
    //   })
    // );


  

  // private isValidUser(user: string, pwd: string): string {
  //   return ((user === 'admin') && (pwd === 'supersecret')) ? '1111111111111' : '';
  // }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    this.sessionService.resetHeader();
    this.sessionService.setIsLogged('false');
    this.sessionService.resetUserCredentials();
    //this.sessionService.resetData();
  }
}
