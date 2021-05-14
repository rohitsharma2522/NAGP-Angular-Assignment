import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { IUser } from '../../shared/interfaces/IUser';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

/** This is a Login service. */
export class LoginService implements OnInit{

  /** Array of login user data. */
  private loginData: IUser[];
  
  userLoggedIn: BehaviorSubject<boolean>;

  constructor() {
    this.userLoggedIn = new BehaviorSubject(false);
    this.getUsers();
    this.getLoginStatus()
  }

  ngOnInit(): void {
    this.getLoginStatus()
  }
  
  /** Method to get all login user data. */
  getUsers(): IUser[] {
    this.loginData = [{
      "id": 1,
      "username": "rohit",
      "password": "rohit"
    }, {
      "id": 2,
      "username": "admin",
      "password": "admin"
    }];
    return this.loginData;
  }

  /** Method that validates login credentials passed by user. */
  validateUser(user: IUser): boolean {
    let validUser = false;
    if (this.loginData.findIndex(usr => user.username.toLowerCase() === usr.username.toLowerCase() && user.password.toLowerCase() === usr.password.toLowerCase()) > -1) {
      validUser = true;
    }
    this.userLoggedIn.next(validUser);
    return validUser;
  }

  getLoginStatus(){
    if(localStorage.getItem('isLoggedIn') === 'Yes'){
      this.userLoggedIn.next(true)
    }else{
      this.userLoggedIn.next(false)
    }
  }

  // private isUserLoggedIn = new BehaviorSubject<boolean>(false);

  // isUserLoggedIn$ = this.isUserLoggedIn.asObservable();


  logoutUser() {
    this.userLoggedIn.next(false);
  }




}