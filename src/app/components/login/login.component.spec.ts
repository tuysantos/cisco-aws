import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import {By} from "@angular/platform-browser";
import { Observable, of as ObservableOf} from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { LoginService } from 'src/app/services/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const router = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRouter = jasmine.createSpyObj('ActivatedRoute', ['navigate']);
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  class LoginServiceMock {
    login (user: string, pwd: string): Observable<any> {
      return ObservableOf((user === 'admin' && pwd ==='supersecret') ? {isvalid: true} : {isvalid: false});
    }

    logout() {
      
    }
  }

  class SessionStorageMock {
    addUser(token: string): void{
    }
  
    removeUser(): void{
    }
  
    getUser(): string{
      return '1111111111111';
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, DashboardComponent ],
      providers: [
        {provide: LoginService, useClass : LoginServiceMock},
        {provide: SessionService, useClass : SessionStorageMock},
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRouter }
      ],
      imports: [
        FormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=text]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be an invalid login', () => {
    component.loginUser = {username: 'admin', password: '123456'};
    fixture.detectChanges();
    component.login();
    expect(component.errorMessage).toEqual('Invalid user or password');
  });

  it('should be logged in', () => {
    component.loginUser = {username: 'admin', password: 'supersecret'};
    fixture.detectChanges();
    component.login();
    expect(component.errorMessage).toEqual('');
  });
});
