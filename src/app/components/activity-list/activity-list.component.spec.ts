import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListComponent } from './activity-list.component';
import { IUC2Instance } from 'src/app/core/models/uc2Instance';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    component.activityList = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event', () => {
    spyOn(component.sortEvent, 'emit').and.callThrough();
    component.sort('name');

    expect(component.sortEvent.emit).toHaveBeenCalled();
    expect(component.sortEvent.emit).toHaveBeenCalledWith('name');
  });
});
