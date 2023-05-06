import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
      :host .alert-custom {
        color: darkgreen;
        background-color: #a5b452;
        width: 80%;
      }
  `, ]
})
export class LoginComponent {
  loginbool = true;
  registerbool = false;
  loginsuccess = false;
  registersuccess = false;
  // invalidbool = true;

  loginForm: FormGroup;
  registerForm: FormGroup;

  @ViewChild('selfClosing', { static: false }) selfClosing!: NgbAlert;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      loginId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });

    this.registerForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z,]*$'),
        ]),
      ],
      userid: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
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
    if(this.loginForm.get('loginId')?.value == 'user'){
      sessionStorage.setItem('role', 'user');
      this.router.navigate(['/vote']);
    }else if(this.loginForm.get('loginId')?.value == 'admin'){
      sessionStorage.setItem('role', 'admin');
      this.router.navigate(['/admin-set-campaign']);
    }
    this.loginForm?.reset();
    this.loginsuccess = true;
    setTimeout(() => this.selfClosing.close(), 4000);
  }

  onRegister() {
    this.registerForm?.reset();
    this.registersuccess = true;
    sessionStorage.setItem('role', 'waiting')
    setTimeout(() => this.selfClosing.close(), 4000);
  }
}
