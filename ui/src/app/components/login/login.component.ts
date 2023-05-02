import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [`
      :host .alert-custom {
        color: darkgreen;
        background-color: #a5b452;
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

  constructor(private fb: FormBuilder, private sb: MatSnackBar) {
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

  // openmessage(message: string, classname: string) {
  //   const configsb = new MatSnackBarConfig();
  //   configsb.duration = 5000;
  //   configsb.verticalPosition = 'top';
  //   configsb.horizontalPosition = 'end';
  //   configsb.panelClass = [classname];
  //   this.sb.open(message, '', configsb);
  // }

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
    if(this.loginForm.get('loginId')?.value == 'user'){
      sessionStorage.setItem('role', 'user');
    }else if(this.loginForm.get('loginId')?.value == 'admin'){
      sessionStorage.setItem('role', 'admin')
      // to get var = sessionStorage.getItem('role')
    }
    this.loginForm?.reset();
    this.loginsuccess = true;
    setTimeout(() => this.selfClosing.close(), 4000);
    // this.openmessage('Logged in!!', "success-message");
  }

  onRegister() {
    // code
    this.registerForm?.reset();
    this.registersuccess = true;
    setTimeout(() => this.selfClosing.close(), 4000);
    // this.openmessage("Registration Done! Please wait for account approval!", "success-message");
  }
}
