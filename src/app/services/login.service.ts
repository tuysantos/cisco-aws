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
    let token = btoa(userId + ':' + password);
    return this.http.get<string>(`${environment.apiEndPoint}/login/${token}`)
        .pipe(
          map( (response: any) => {
            if(response.isvalid){
              this.sessionService.addToken(token);
              this.sessionService.setUserName(userId);
              this.sessionService.setUserPassword(password);
            }
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

  logout() {
    // remove user from local session to log user out
    this.sessionService.removeUser();
    this.sessionService.resetHeader();
    this.sessionService.setIsLogged('false');
    this.sessionService.resetUserCredentials();
  }
}
