import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  userLoggedIn: boolean = false;
  constructor(private router: Router, private loginService:LoginService) {
    this.loginService.userLoggedIn.subscribe(s => {
      console.log("here",s);
      if(localStorage.getItem('isLoggedIn') === 'Yes'){
        this.userLoggedIn = true
      }else{
        this.userLoggedIn = false
      }
    });
   
  }
  ngOnInit() {
    //this.updateLogin();
  }
  // updateLogin(){
  //   this.loginService.userLoggedIn.subscribe( c => {
  //     this.userLoggedIn = c
  //   })
  //   console.log(this.userLoggedIn)
  //   return this.userLoggedIn;
  // }
  logoutUser() {
    this.loginService.logoutUser();
    localStorage.removeItem('isLoggedIn');
    this.userLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}
