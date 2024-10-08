import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../myService/supabase.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  loginData: any = {
    email: '',
    pswd: '',
  };

  signUpData: any = {
    userName: '',
    email: '',
    pswd: '',
  };

  signUpErorr: string = '';
  classMessage: string = 'alert-warning';

  errorCanceled: boolean = true;

  logCheck: boolean = false;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) { }

  async signUp() {
    // Reset the flag to allow the alert to show again
    this.errorCanceled = false;

    const data = await this.supabaseService.signUpS(this.signUpData);

    if (this.supabaseService.signUperror) {
      console.log(this.supabaseService.signUperror);
      if (this.supabaseService.signUperror.includes('success')) {
        this.classMessage = 'alert-success';
        this.signUpErorr = this.supabaseService.signUperror;
        this.signUpData = {
          userName: '',
          email: '',
          pswd: '',
        };
      } else {
        console.log('else error');

        this.signUpErorr = this.supabaseService.signUperror;
      }
    }
  }

  signInErorr: string = '';

  async login() {
    const data = await this.supabaseService.loginS(this.loginData);

    if (this.supabaseService.loginError) {
      this.signInErorr = this.supabaseService.loginError;
    } else {
      this.router.navigateByUrl('/task_list');
    }
  }

  alertClose() {
    this.errorCanceled = true;
    this.signUpErorr = '';
  }

  alertCloseS() {
    this.signInErorr = '';
  }

  // pwd strenght 
  passwordClassM: string = 'text-danger';
  passwordClassUL: string = 'text-danger';
  passwordClassN: string = 'text-danger';
  passwordClassSC: string = 'text-danger';
  passAllCheck: boolean = true;
  Salphabet: boolean = false;
  SpecialChars: boolean = false;
  numbers: boolean = false;
  minMixL: boolean = false;

  checkPasswordStrength() {
    const password = this.signUpData.pswd;
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (minLength) {
      this.minMixL = true;
      this.passwordClassM = 'text-success';
    }
    else{
      this.minMixL = false;
      this.passwordClassM = 'text-danger';
    }

    if (hasUpperCase && hasLowerCase) {
      this.Salphabet = true;
      this.passwordClassUL = 'text-success';
    }
    else{
      this.Salphabet = false;
      this.passwordClassUL = 'text-danger';
    }

    if (hasNumbers) {
      this.numbers = true;
      this.passwordClassN = 'text-success';
    }
    else{
      this.numbers = false;
      this.passwordClassN = 'text-danger';
    }

    if (hasSpecialChars) {
      this.SpecialChars = true;
      this.passwordClassSC = 'text-success';
    }
    else{
      this.SpecialChars = false;
      this.passwordClassSC = 'text-danger';
    }

    if (minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
      this.passAllCheck = false;
    }

  }


}
