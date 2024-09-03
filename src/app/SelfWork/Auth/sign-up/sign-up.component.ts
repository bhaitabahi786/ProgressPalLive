import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, Validators  } from '@angular/forms';
import { SupabaseService } from '../../myService/supabase.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  loginData: any = {
    email: '',
    pswd: ''
  }

  signUpData: any = {
    userName: '',
    email: '',
    pswd: ''
  }

  signUpErorr: string = '';
  classMessage: string = 'alert-warning';

  logCheck: boolean = false

  constructor(private supabaseService: SupabaseService, private router: Router) {  }

  async signUp(){

    const data = await this.supabaseService.signUpS(this.signUpData);

    if(this.supabaseService.signUperror){
      console.log(this.supabaseService.signUperror);
      if(this.supabaseService.signUperror.includes('success')){
        this.classMessage = 'alert-success'
        this.signUpErorr = this.supabaseService.signUperror;
        this.signUpData = {
          userName: '',
          email: '',
          pswd: ''
        }
      }
      this.signUpErorr = this.supabaseService.signUperror;

    }
    
  }

  signInErorr: string = '';

  async login(){

    const data = await this.supabaseService.loginS(this.loginData);
    
    if(this.supabaseService.loginError){
      this.signInErorr = this.supabaseService.loginError;
    }else {
      this.router.navigateByUrl('/task_list');
    }

    
  }

}
