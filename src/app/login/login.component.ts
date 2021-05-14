import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: Login;
  loginForm: FormGroup
  serverError: boolean = false;
  constructor(private router: Router, private loginService: LoginService, private toastrService: ToastrService, public formBuilder: FormBuilder) { 
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })  
  }


  submitLoginForm() {
    if(this.loginService.validateUser(this.loginForm.value)) {
      this.serverError = false;
      localStorage.setItem("isLoggedIn", 'Yes');
      this.loginService.getLoginStatus();
      this.router.navigateByUrl('/dashboard');
      this.toastrService.success('Logged In Successfully');

    } else {
      this.serverError = true;
    }
   
  }
}
