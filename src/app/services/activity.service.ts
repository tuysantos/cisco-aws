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

  /*private getMockData(): IUC2Instance[]{
    let data: IUC2Instance[];
    data = [];

    data[data.length] = { name: 'name 1', id: 'a-123456abcd', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.167.200', privateIP: '10.20.30.40', state: 'running'};
    data[data.length] = { name: 'name 2', id: 'a-027845mpds', type: 't2.small', az: 'us-east-1b', publicIP: '54.210.167.201', privateIP: '10.20.30.41', state: 'running'};
    data[data.length] = { name: 'name 3', id: 'b-457822wers', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.167.203', privateIP: '10.20.30.42', state: 'running'};
    data[data.length] = { name: 'name 4', id: 'a-114582qprr', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.167.204', privateIP: '10.20.30.43', state: 'stopped'};
    data[data.length] = { name: 'name 5', id: 'c-451233gdcb', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.167.205', privateIP: '10.20.30.44', state: 'running'};
    data[data.length] = { name: 'name 6', id: 'b-b78945cbvj', type: 't1.small', az: 'us-east-1b', publicIP: '54.210.167.206', privateIP: '10.20.30.45', state: 'running'};
    data[data.length] = { name: 'name 7', id: 't-238455mjpu', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.167.207', privateIP: '10.20.30.46', state: 'running'};
    data[data.length] = { name: 'name 8', id: 'm-982332eeea', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.167.208', privateIP: '10.20.30.47', state: 'running'};
    data[data.length] = { name: 'name 9', id: 'd-512344hdfs', type: 't2.small', az: 'us-east-1b', publicIP: '54.210.167.209', privateIP: '10.20.30.48', state: 'running'};
    data[data.length] = { name: 'name 10', id: 'a-035457dsfg', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.130', privateIP: '10.20.30.49', state: 'stopped'};
    data[data.length] = { name: 'name 11', id: 'v-984522dscf', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.130', privateIP: '10.20.30.40', state: 'running'};
    data[data.length] = { name: 'name 12', id: 's-362541xvds', type: 't2.small', az: 'us-east-1b', publicIP: '54.210.168.131', privateIP: '10.20.31.40', state: 'running'};
    data[data.length] = { name: 'name 13', id: 'z-451477ffds', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.168.132', privateIP: '10.20.32.40', state: 'running'};
    data[data.length] = { name: 'name 14', id: 'a-582142jhiy', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.168.133', privateIP: '10.20.33.40', state: 'stopped'};
    data[data.length] = { name: 'name 15', id: 'p-251422soiu', type: 't1.small', az: 'us-east-1b', publicIP: '54.210.168.134', privateIP: '10.20.34.40', state: 'running'};
    data[data.length] = { name: 'name 16', id: 'g-547123weot', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.168.135', privateIP: '10.20.35.40', state: 'running'};
    data[data.length] = { name: 'name 17', id: 'f-125248qwer', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.168.136', privateIP: '10.20.36.40', state: 'running'};
    data[data.length] = { name: 'name 18', id: 'l-851241nkhf', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.137', privateIP: '10.20.37.40', state: 'running'};
    data[data.length] = { name: 'name 19', id: 'k-142513vkjf', type: 't2.small', az: 'us-east-1b', publicIP: '54.210.168.138', privateIP: '10.20.38.40', state: 'stopped'};
    data[data.length] = { name: 'name 20', id: 'b-012513wsxc', type: 't1.small', az: 'us-east-1b', publicIP: '54.210.168.139', privateIP: '10.20.39.40', state: 'running'};
    data[data.length] = { name: 'name 21', id: 'y-251252dkfg', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.168.140', privateIP: '10.21.30.40', state: 'running'};
    data[data.length] = { name: 'name 22', id: 'i-162542djgg', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.141', privateIP: '10.21.30.40', state: 'running'};
    return data;
  }*/
}
 