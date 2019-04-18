import { TestBed, async, inject } from '@angular/core/testing';

import { LoginGuard } from './login.guard';
import { Router } from '@angular/router';

describe('LoginGuard', () => {
  const router = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginGuard,
        { provide: Router, useValue: router }]
      
    });
  });

  it('should ...', inject([LoginGuard], (guard: LoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
