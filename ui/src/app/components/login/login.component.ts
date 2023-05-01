import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginbool = false;
  registerbool = false;

  makeLogin(){
    this.loginbool = true;
    this.registerbool = false;
    // add more code
  }

  makeRegister(){
    this.loginbool = false;
    this.registerbool = true;
    //  more code
  }

  onLogin(){
    // code
    return undefined;
  }

  onRegister(){
    // code
    return undefined;
  }

}
