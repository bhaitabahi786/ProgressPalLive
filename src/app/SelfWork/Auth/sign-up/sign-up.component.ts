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
  ) {}

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

  passwordStrengthMessage: string = '';
  passwordStrengthClass: string = 'text-muted';
  passAllCheck: boolean = true;
  Salphabet:boolean = false;
  SpecialChars:boolean = false;
  numbers:boolean = false;
  minMixL:boolean = false;

  checkPasswordStrength() {
    const password = this.signUpData.pswd;
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
      this.passwordStrengthMessage = 'Strong password';
      this.passwordStrengthClass = 'text-success';
      this.passAllCheck = false;
    } else if (minLength && (hasUpperCase || hasLowerCase) && (hasNumbers || hasSpecialChars)) {
      this.passwordStrengthMessage = 'Medium password';
      this.passwordStrengthClass = 'text-warning';
    } else {
      this.passwordStrengthMessage = 'Weak password';
      this.passwordStrengthClass = 'text-danger';
    }

    if(minLength){
      this.minMixL = true;
    } 
   if(hasUpperCase && hasLowerCase){
      this.Salphabet = true;
    } 
     if(hasNumbers){
      this.numbers = true;
    }
     if(hasSpecialChars){
      this.SpecialChars = true;
    }
    // else {
    //   this.minMixL = true;
    //   this.Salphabet = true;
    // }

  }


}
