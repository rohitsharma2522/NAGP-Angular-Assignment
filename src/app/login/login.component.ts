import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: Login;
  constructor(private router: Router, private loginService: LoginService) { 
    this.login = new Login();
  }


  submitLoginForm(loginForm: NgForm) {
    localStorage.setItem("isLoggedIn", 'Yes');
    this.loginService.validateUser(loginForm.value);
    this.loginService.getLoginStatus();
    this.router.navigateByUrl('/dashboard');
  }
}
