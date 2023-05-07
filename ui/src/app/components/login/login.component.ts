import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  styles: [
    `
      :host .alert-custom {
        color: darkgreen;
        background-color: #a5b452;
        width: 80%;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  loginbool = true;
  registerbool = false;
  hide = true;

  loginForm: FormGroup;
  registerForm: FormGroup;

  ngOnInit(): void {
    sessionStorage.setItem('role', 'waiting');
  }

  @ViewChild('selfClosing', { static: false }) selfClosing!: NgbAlert;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sb: MatSnackBar
  ) {
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
    if (this.loginForm.get('loginId')?.value == 'user') {
      sessionStorage.setItem('role', 'user');
      this.router.navigate(['/vote']);
    } else if (this.loginForm.get('loginId')?.value == 'admin') {
      sessionStorage.setItem('role', 'admin');
      this.router.navigate(['/admin-set-campaign']);
    }
    this.loginForm?.reset();
    this.sb.open('Login Success!!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }

  onRegister() {
    this.registerForm?.reset();
    sessionStorage.setItem('role', 'waiting');
    this.sb.open('Registered! Wait for the Admin to approve!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
