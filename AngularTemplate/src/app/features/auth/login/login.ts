import {Component, inject, signal} from '@angular/core';
import {Register} from "../register/register";
import {NgClass} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  imports: [
    Register,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  fb = inject(FormBuilder)
  isFormLogin = signal<boolean>(true);
  viewPassword: boolean = false;



  formLogin : FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  isFieldInvalid(field: string): boolean {
    const control = this.formLogin.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  login(){
    if (this.formLogin.invalid) {
      console.log('No valido')
    }else {
      console.log('Bienvenido')
    }

  }


  changeForm(){
    this.isFormLogin.update(state => !state);
  }

  changePassword(){
    this.viewPassword = !this.viewPassword;
  }

}
