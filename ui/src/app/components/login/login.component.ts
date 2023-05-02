import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginbool = true;
  registerbool = false;
  // invalidbool = true;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      loginId: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')])],
      password: [
        '', Validators.compose([
        Validators.required,
        Validators.minLength(8),])
      ],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.compose( [Validators.required, Validators.pattern('^[a-zA-Z,]*$')] )],
      userid: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',Validators.compose([
        Validators.required,
        Validators.minLength(8),])
      ],
    });
  }


  makeLogin() {
    this.loginbool = true;
    this.registerbool = false;
    // add more code
  }

  makeRegister() {
    this.loginbool = false;
    this.registerbool = true;
    //  more code
  }

  onLogin() {
    // code
    this.loginForm?.reset();
  }

  onRegister() {
    // code
    this.registerForm?.reset();
  }
}
