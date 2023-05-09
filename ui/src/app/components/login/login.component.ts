import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DbnodeService } from 'src/app/dbnode.service';

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
    //sessionStorage.setItem('role', 'waiting');
  }

  @ViewChild('selfClosing', { static: false }) selfClosing!: NgbAlert;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sb: MatSnackBar,
    private databaseService: DbnodeService
  ) {
    this.loginForm = this.fb.group({
      loginId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
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
          Validators.pattern('^[0-9]*$'),
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
    /*if (this.loginForm.get('loginId')?.value == 'user') {
      sessionStorage.setItem('role', 'user');
      this.router.navigate(['/vote']);
    } else if (this.loginForm.get('loginId')?.value == 'admin') {
      sessionStorage.setItem('role', 'admin');
      this.router.navigate(['/admin-set-campaign']);
    } */
    const data = {
      VoterID: this.loginForm.value.loginId,
      Password: this.loginForm.value.password
    }
    //console.log(data.VoterID)
    this.databaseService.checkcredentials(data).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.isAdmin == 0) {
          this.router.navigate(['/vote']);
          this.sb.open('Login Success!!', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
        } else if (response.isAdmin == 1) {
          this.router.navigate(['/admin-set-campaign']);
          this.sb.open('Login Success!!', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
        }
      },
      error: (error: any) => {
        console.log(error.error.message);
          this.sb.open(error.error.message, '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
      }
    });
    this.loginForm?.reset();
  }

  onRegister() {
    /*
    this.registerForm?.reset();
    sessionStorage.setItem('role', 'waiting');
    
    this.sb.open('Registered! Wait for the Admin to approve!', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000
    }); */

    const data = {
      VoterName: this.registerForm.value.name,
      VoterID: this.registerForm.value.userid,
      Email: this.registerForm.value.email,
      Password: this.registerForm.value.password
    };
    //console.log(data.Email)
    this.databaseService.add(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.registerForm?.reset();
        this.sb.open('Registered! Wait for the Admin to approve!', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      },
      error: (error: any) => {
        console.log(error.error.message);
        if (error.error.message.includes("ER_DUP_ENTRY")) {
          this.sb.open('Voter ID already exists please select a different voterID', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
        }
        this.sb.open(error.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
  }
}
