import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.compose([Validators.required])),
    pass: new FormControl('', Validators.compose([Validators.required]))
  });

  constructor(
    private loginService: LoginService, 
    private router: Router) { }

  submitLogin() {
    if(this.loginForm.invalid) {
      return;
    }

    const user = this.loginForm.controls['username'].value;
    const pass = this.loginForm.controls['pass'].value;

    this.loginService.login(user, pass).subscribe(result => {
      localStorage.setItem('token', result.accessToken);
      this.router.navigate(['transactions']);
    });
  }
}
