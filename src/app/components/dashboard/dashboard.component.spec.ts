import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { ActivityService } from 'src/app/services/activity.service';
import { Observable, of as ObservableOf } from 'rxjs';
import { IUC2Instance } from 'src/app/core/models/uc2Instance';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivityListComponent } from '../activity-list/activity-list.component';
import { SummaryActivityComponent } from '../summary-activity/summary-activity.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  class ActivityServiceMock {
    getActiveInstances(): Observable<IUC2Instance[]> {
      return ObservableOf(this.getMockData());
    }


    getMockData(): IUC2Instance[]{
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
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, ActivityListComponent, SummaryActivityComponent, PaginationComponent, SearchComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        {provide: ActivityService, useClass : ActivityServiceMock},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.uc2ActiveList = component.uc2Instances;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of UC2 Instances', () => {
    expect(component.uc2Instances.length).toBe(22);
  });

  it('should have the correct correct summary totals', () => {
    component.getSummary();
    expect(component.totalRunning).toBe(18);
    expect(component.totalStop).toBe(4);
  });

  it('should have only 10 records in the active list', () => {
    expect(component.uc2ActiveList.length).toBe(10);
  });

  it('should go to next page', () => {
    component.nextPreviousPage(3);
    fixture.detectChanges();
    expect(component.uc2ActiveList.length).toBe(2);
  });

  it('should go to previous page', () => {
    component.nextPreviousPage(2);
    fixture.detectChanges();
    expect(component.uc2ActiveList.length).toBe(10);
  });

  it('should stay on the same page', () => {
    let temp: IUC2Instance = component.uc2ActiveList[0];
    let temp1: IUC2Instance = component.uc2ActiveList[4];
    component.nextPreviousPage(1);
    fixture.detectChanges();
    expect(component.uc2ActiveList.length).toBe(10);
    expect(temp.name).toBe(component.uc2ActiveList[0].name);
    expect(temp1.name).toBe(component.uc2ActiveList[4].name);
  });
});
