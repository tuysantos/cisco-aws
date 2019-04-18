import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of as ObservableOf } from 'rxjs';
import { IUC2Instance, IPagedItem } from '../core/models/uc2Instance';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient, private sessionService: SessionService) { }
  
  getActiveInstances(): Observable<IUC2Instance[]> {
    return this.http.get<IUC2Instance[]>(`${environment.apiEndPoint}/uc2instances`)
        .pipe(
          map( (items: IUC2Instance[]) => {
            return items;
          }),
          catchError(this.handleError)
        );
  }

  getActiveInstancesPage(skip: number, pageSize: number): Observable<IPagedItem> {
    return this.http.get<IPagedItem>(`${environment.apiEndPoint}/uc2instances/page/${skip}/${pageSize}/${ this.sessionService.getToken()}`)
        .pipe(
          map( (items: IPagedItem) => {
            return items;
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
}
 