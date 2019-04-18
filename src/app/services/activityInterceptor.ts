import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';


@Injectable()
export class ActivityInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('user credentials', this.sessionService.getUserName() + ':' + this.sessionService.getUserPassword());
      console.log('user credentials', btoa(this.sessionService.getUserName() + ':' + this.sessionService.getUserPassword()))
    request = request.clone({
      setHeaders: {
        //'X-API-KEY': this.sessionService.getHeader(),
        //Authorization: 'Basic ' +  btoa(this.sessionService.getUserName() + ':' + this.sessionService.getUserPassword()),
        //'Content-Type' : 'application/json',
        //'Access-Control-Allow-Credentials' : 'true',
        //'Access-Control-Allow-Origin' : '*'
        //'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT'
      }
    });

    return next.handle(request);
  }
}