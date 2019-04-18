import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ILoginUser } from 'src/app/core/models/loginUser';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser: ILoginUser = {username:'', password:''};
  loading = false;
  returnUrl: string;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.logout();
  }

  login() {
    this.loading = true;
    this.errorMessage = '';
    this.loginService.login(this.loginUser.username, this.loginUser.password)
      .pipe(take(1))
      .subscribe((data: any) => {
        this.loading = false;
        console.log('data', data)
        if(data.isvalid === true) {
          console.log('data should load', data)
          this.router.navigate(['/dashboard']);
        }
        else {
          this.errorMessage = 'Invalid user or password';
        }
      },
      (error: Error) => {
        this.loading = false;
        this.errorMessage = error.message;
      });
  }

}
