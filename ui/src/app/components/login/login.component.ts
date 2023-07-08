import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DbnodeService } from 'src/app/dbnode.service';
import { ApiService } from 'src/app/api.service';
import * as sha256 from 'crypto-js/sha256';
import * as  sha1 from 'crypto-js/sha1';
import { enc } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginbool = true;
  registerbool = false;
  hide = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  emailcheck: any; 
  otpfield = false;
  registerEnable=false;
  otpverified=false;
  enablesendotp=false;
  
  ngOnInit(): void {
    sessionStorage.setItem('role', 'waiting');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sb: MatSnackBar,
    private databaseService: DbnodeService,
    private apiservice: ApiService
  ) {
    this.loginForm = this.fb.group({
      loginId: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required]),
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
      otp: ['', Validators.compose([Validators.required])],
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
    let pwd = sha256(sha1(this.loginForm.value.loginId + this.loginForm.value.password).toString()).toString();
    this.loginForm.value.password=pwd;
    const data = {
      VoterID: this.loginForm.value.loginId,
      Password: this.loginForm.value.password
    }
    console.log(data)
    //console.log(data.VoterID)
    this.databaseService.checkcredentials(data).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.isAdmin == 0 && response.isAprroved == 1) {
          this.apiservice.setVoterId(response.VoterID)
          this.router.navigate(['/vote']);
          this.sb.open('Login Success!!', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
          sessionStorage.setItem('role', 'user');
        } 
        else if (response.isAdmin == 1) {
          this.router.navigate(['/admin-set-campaign']);
          this.apiservice.setVoterId(response.VoterID);
          this.sb.open('Login Success!!', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
          sessionStorage.setItem('role', 'admin');
        }
        else if (response.isAprroved == 0) {
          this.sb.open('Wait for the Admin to Approve', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
          sessionStorage.setItem('role', 'waiting');
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

  onEmailInsert(event:any) {
    const data = {
      email: event.target.value
    }
    console.log(data)
    //console.log(data.VoterID)
    this.databaseService.checkEmail(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.emailcheck = false;
        if(this.registerForm.get('email')?.valid) {
          console.log('NO ERROR')
          this.enablesendotp =true;
        }
        else {
          this.enablesendotp =false;

        }
      },
      error: (error: any) => {
        this.emailcheck = true
        this.enablesendotp =false;
      }
    });
  }

  verify() {
    const data = {
      email: this.registerForm.value.email
    }
    console.log(data)
    //console.log(data.VoterID)
    this.databaseService.verifyEmail(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.sb.open('OTP sent', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        this.otpfield=true;
      },
      error: (error: any) => {
        this.otpfield=false;
        this.sb.open('Some error occurred '+ error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
    });
  }

  confirmOtp() {
    const encotp = sha256(this.registerForm.value.otp)
    const encotp1 = encotp.toString(enc.Hex)
    console.log("OTP to be sent is "+encotp1)
    const data = {
      otp: encotp1
    }
    //console.log(data)
    //console.log(data.VoterID)
    this.databaseService.verifyOtp(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.sb.open('OTP Verified', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        this.registerEnable=true;
        this.otpfield=false;
        this.otpverified=true;
        this.registerForm.get('email')?.disable();
      },
      error: (error: any) => {
        if(error.error.message==="Invalid OTP")
        {
          this.sb.open('Entered OTP is incorrect', '', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000
          });
        } else {
        this.sb.open('Some error occurred '+ error, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
      }
        this.registerEnable=false;
      }
    });
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
    this.registerForm.get('email')?.enable();
    let pwd = sha256(sha1(this.registerForm.value.userid + this.registerForm.value.password).toString()).toString();
    this.registerForm.value.password=pwd;
    const data = {
      VoterName: this.registerForm.value.name,
      VoterID: this.registerForm.value.userid,
      Email: this.registerForm.value.email,
      Password: this.registerForm.value.password
    };
    //console.log(data.Email)
    this.registerForm.get('email')?.disable();
    this.databaseService.add(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.registerForm?.reset();
        this.sb.open('Registered! Wait for the Admin to approve!', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        sessionStorage.setItem('role', 'waiting');
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
  }
}
